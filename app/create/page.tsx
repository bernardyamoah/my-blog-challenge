'use client';

import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { createPost } from '@/lib/createPost';

const initialForm = {
	title: '',
	body: '',
	username: '',
};
type FieldName = keyof typeof initialForm;
const fieldNames: FieldName[] = ['title', 'body', 'username'];

export default function Page() {
	const [form, updateForm] = useState(initialForm);
	const [touched, setTouched] = useState({
		title: false,
		body: false,
		username: false,
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [autosaveEnabled, setAutosaveEnabled] = useState(true);

	const stats = useMemo(() => {
		const wordCount = form.body.trim()
			? form.body.trim().split(/\s+/).length
			: 0;
		const readTime = wordCount ? Math.max(1, Math.ceil(wordCount / 180)) : 0;
		return { wordCount, readTime };
	}, [form.body]);

	const errors = {
		title: touched.title && !form.title.trim() ? 'Title is required' : '',
		body: touched.body && form.body.trim().length < 12
			? 'Body should be at least 12 characters'
			: '',
		username:
			touched.username && !form.username.trim() ? 'Username is required' : '',
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = event.target;
		if (!fieldNames.includes(name as FieldName)) return;
		const field = name as FieldName;
		updateForm({ ...form, [field]: value });
	};

	const handleBlur = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name } = event.target;
		if (!fieldNames.includes(name as FieldName)) return;
		const field = name as FieldName;
		setTouched({ ...touched, [field]: true });
	};

	const resetForm = () => {
		updateForm(initialForm);
		setTouched({
			title: false,
			body: false,
			username: false,
		});
	};

	useEffect(() => {
		if (typeof window === 'undefined') return;
		const savedDraft = localStorage.getItem('draft:create-post');
		if (savedDraft) {
			try {
				const parsed = JSON.parse(savedDraft);
				updateForm({ ...initialForm, ...parsed });
			} catch {
				// ignore malformed drafts
			}
		}
	}, []);

	useEffect(() => {
		if (!autosaveEnabled || typeof window === 'undefined') return;
		const handle = setTimeout(() => {
			localStorage.setItem('draft:create-post', JSON.stringify(form));
		}, 400);
		return () => clearTimeout(handle);
	}, [autosaveEnabled, form]);

	const clearDraftStorage = () => {
		if (typeof window === 'undefined') return;
		localStorage.removeItem('draft:create-post');
	};

	const markdownToHtml = (input: string) => {
		const escapeHtml = (str: string) =>
			str
				.replace(/&/g, '&amp;')
				.replace(/</g, '&lt;')
				.replace(/>/g, '&gt;')
				.replace(/"/g, '&quot;')
				.replace(/'/g, '&#39;');

		let html = escapeHtml(input);

		html = html.replace(/```([\s\S]*?)```/g, (_, code: string) => {
			return `<pre class="rounded-lg bg-muted p-3 text-sm overflow-auto"><code>${code}</code></pre>`;
		});
		html = html.replace(/^### (.*)$/gm, '<h3 class="mt-4 text-lg font-semibold">$1</h3>');
		html = html.replace(/^## (.*)$/gm, '<h2 class="mt-5 text-xl font-semibold">$1</h2>');
		html = html.replace(/^# (.*)$/gm, '<h1 class="mt-6 text-2xl font-semibold">$1</h1>');
		html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
		html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
		html = html.replace(/`([^`]+)`/g, '<code class="px-1 py-0.5 rounded bg-muted text-sm">$1</code>');
		html = html.replace(/^- (.*)$/gm, '<li>$1</li>');
		html = html.replace(/(<li>.*<\/li>)/gs, '<ul class="list-disc list-inside space-y-1">$1</ul>');
		html = html.replace(/\n{2,}/g, '</p><p>');
		html = `<p>${html.replace(/\n/g, '<br/>')}</p>`;
		return html;
	};

	const insertTemplate = (template: string) => {
		updateForm((prev) => ({ ...prev, body: `${prev.body}\n${template}` }));
		setTouched((prev) => ({ ...prev, body: true }));
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		setTouched({ title: true, body: true, username: true });
		if (!form.title.trim() || !form.body.trim() || !form.username.trim()) {
			toast.error('Please fill in all fields to publish your post.');
			return;
		}

		setIsSubmitting(true);
		try {
			await createPost({
				title: form.title.trim(),
				body: form.body.trim(),
				username: form.username.trim(),
			});
			resetForm();
			clearDraftStorage();
		} catch (error) {
			toast.error('Failed to publish. Please try again.');
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<section className="max-w-5xl px-6 py-10 mx-auto space-y-8">
			<header className="space-y-2 text-center">
				<p className="text-sm uppercase text-muted-foreground tracking-[0.3em]">
					New story
				</p>
				<h1 className="text-3xl font-semibold md:text-4xl">
					Share an idea worth reading
				</h1>
				<p className="max-w-2xl mx-auto text-sm text-muted-foreground">
					Add a title, tell your story, and let the preview guide you before you
					publish.
				</p>
			</header>

			<div className="grid gap-6 md:grid-cols-[3fr,2fr] items-start">
				<Card>
					<CardHeader className="space-y-2">
						<CardTitle>Write</CardTitle>
						<CardDescription>Polish the basics before sharing.</CardDescription>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSubmit} className="space-y-5">
							<div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
								<button
									type="button"
									className="px-3 py-1 font-medium rounded-full bg-muted text-foreground"
									onClick={() => insertTemplate('## Outline\n- Point one\n- Point two\n')}
								>
									Insert outline
								</button>
								<button
									type="button"
									className="px-3 py-1 font-medium rounded-full bg-muted text-foreground"
									onClick={() => insertTemplate('```\nconst hello = () => console.log(\"hi\");\n```')}
								>
									Code block
								</button>
								<button
									type="button"
									className="px-3 py-1 font-medium rounded-full bg-muted text-foreground"
									onClick={() => insertTemplate('> Quick takeaway:\n')}
								>
									Quote
								</button>
								<label className="flex items-center gap-2">
									<input
										type="checkbox"
										checked={autosaveEnabled}
										onChange={(event) => setAutosaveEnabled(event.target.checked)}
									/>
									<span>Autosave draft</span>
								</label>
							</div>

							<div className="space-y-2">
								<div className="flex items-center justify-between text-xs uppercase text-muted-foreground">
									<label htmlFor="title" className="tracking-wide">
										Title
									</label>
									<span className="text-[0.7rem]">{form.title.length}/120</span>
								</div>
								<Input
									id="title"
									name="title"
									maxLength={120}
									value={form.title}
									onChange={handleInputChange}
									onBlur={handleBlur}
									placeholder="Give your post a strong headline"
									className={errors.title ? 'border-destructive/50' : ''}
								/>
								{errors.title && (
									<p className="text-xs text-destructive">{errors.title}</p>
								)}
							</div>

							<div className="space-y-2">
								<div className="flex items-center justify-between text-xs uppercase text-muted-foreground">
									<label htmlFor="username" className="tracking-wide">
										Author
									</label>
									<span className="text-[0.7rem]">
										Use your handle or first name
									</span>
								</div>
								<Input
									id="username"
									name="username"
									value={form.username}
									onChange={handleInputChange}
									onBlur={handleBlur}
									placeholder="@you"
									className={errors.username ? 'border-destructive/50' : ''}
								/>
								{errors.username && (
									<p className="text-xs text-destructive">{errors.username}</p>
								)}
							</div>

							<div className="space-y-2">
								<div className="flex items-center justify-between text-xs uppercase text-muted-foreground">
									<label htmlFor="body" className="tracking-wide">
										Body
									</label>
									<span className="text-[0.7rem]">
										{stats.wordCount} words ·
										{' '}
										{stats.readTime || 1}
										{' '}
										min read
									</span>
								</div>
								<Textarea
									id="body"
									name="body"
									value={form.body}
									onChange={handleInputChange}
									onBlur={handleBlur}
									placeholder="Tell your story..."
									className={`min-h-[220px] ${errors.body ? 'border-destructive/50' : ''}`}
								/>
								{errors.body && (
									<p className="text-xs text-destructive">{errors.body}</p>
								)}
							</div>

							<div className="flex items-center justify-between gap-3 pt-2">
								<Button
									type="button"
									variant="outline"
									onClick={resetForm}
									disabled={
										isSubmitting ||
										(!form.title && !form.body && !form.username)
									}
								>
									Clear draft
								</Button>
								<Button type="submit" disabled={isSubmitting}>
									{isSubmitting ? 'Publishing…' : 'Publish post'}
								</Button>
							</div>
						</form>
					</CardContent>
				</Card>

				<Card className="border-dashed">
					<CardHeader>
						<CardTitle>Live preview</CardTitle>
						<CardDescription>See how your post will appear.</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-1">
							<p className="text-xs uppercase text-muted-foreground tracking-[0.2em]">
								{form.username || 'anonymous'}
							</p>
							<h2 className="text-2xl font-semibold capitalize">
								{form.title || 'Untitled draft'}
							</h2>
						</div>
						<div className="text-sm leading-relaxed text-muted-foreground max-h-72 overflow-auto">
							{form.body ? (
								<div
									className="space-y-2"
									dangerouslySetInnerHTML={{ __html: markdownToHtml(form.body) }}
								/>
							) : (
								<p>Your words will show up here as you type.</p>
							)}
						</div>
						<div className="text-xs text-muted-foreground">
							{stats.wordCount ? (
								<span>
									{stats.wordCount}
									{' '}
									words · ~
									{stats.readTime}
									{' '}
									min to read
								</span>
							) : (
								<span>Start typing to see reading time.</span>
							)}
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
