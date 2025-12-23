'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Edit, Share2, Trash } from "lucide-react";

import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { deletePost } from "@/lib/deletePost";
import { formatTime, formatUserTime } from "@/lib/functions";
import { updatePost } from "@/lib/updatePost";

export default function Post({ post }) {
	const router = useRouter();
	const [postData, setPostData] = useState({
		title: post.title,
		body: post.body,
		username: post.username,
	});
	const [showDialog, setShowDialog] = useState(false);
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);
	const [copied, setCopied] = useState(false);
	const [isUpdating, setIsUpdating] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);

	const wordStats = useMemo(() => {
		const words = postData.body.trim() ? postData.body.trim().split(/\s+/).length : 0;
		return {
			words,
			readTime: words ? Math.max(1, Math.ceil(words / 180)) : 1,
		};
	}, [postData.body]);

	const handleUpdate = async () => {
		if (!postData.title.trim() || !postData.body.trim() || !postData.username.trim()) {
			toast.error("Please fill in all fields before saving.");
			return;
		}

		setIsUpdating(true);
		try {
			await updatePost(post.$id, {
				title: postData.title.trim(),
				body: postData.body.trim(),
				username: postData.username.trim(),
			});
			setShowDialog(false);
		} catch (error) {
			toast.error("Unable to update the post right now.");
		} finally {
			setIsUpdating(false);
		}
	};

	const handleDelete = async () => {
		setIsDeleting(true);
		try {
			await deletePost(post.$id);
			router.push("/");
		} catch (error) {
			toast.error("Could not delete the post. Please try again.");
		} finally {
			setShowDeleteDialog(false);
			setIsDeleting(false);
		}
	};

	const handleCopyLink = async () => {
		if (typeof window === "undefined" || !navigator?.clipboard) {
			toast.error("Clipboard is not available.");
			return;
		}

		try {
			await navigator.clipboard.writeText(window.location.href);
			setCopied(true);
			setTimeout(() => setCopied(false), 1800);
		} catch (error) {
			toast.error("Failed to copy the link.");
		}
	};

	return (
		<>
			<section className="max-w-5xl px-6 py-10 mx-auto space-y-6">
				<div className="flex flex-wrap items-center justify-between gap-3">
					<Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
						&#8592; Back to posts
					</Link>

					<div className="flex flex-wrap items-center gap-2">
						<Button variant="outline" onClick={handleCopyLink} size="sm">
							<Share2 className="w-4 h-4 mr-2" />
							{copied ? "Link copied" : "Share"}
						</Button>
						<Button variant="secondary" onClick={() => setShowDialog(true)} size="sm">
							<Edit className="w-4 h-4 mr-2" />
							Edit
						</Button>
						<Button
							variant="destructive"
							onClick={() => setShowDeleteDialog(true)}
							size="sm"
						>
							<Trash className="w-4 h-4 mr-2" />
							Delete
						</Button>
					</div>
				</div>

				<Card>
					<CardHeader className="space-y-3">
						<div className="flex items-center gap-3 text-xs uppercase text-muted-foreground tracking-[0.25em]">
							<Badge variant="outline" className="text-[0.65rem]">
								{formatTime(post.$createdAt)}
							</Badge>
							<span>@{postData.username}</span>
						</div>
						<CardTitle className="text-3xl md:text-4xl">{postData.title}</CardTitle>
						<p className="text-sm text-muted-foreground">
							Published {formatUserTime(post.$createdAt)} · ~{wordStats.readTime} min read
						</p>
					</CardHeader>
					<CardContent className="space-y-6">
						<p className="text-base leading-relaxed text-muted-foreground whitespace-pre-line">
							{postData.body}
						</p>

						<Card className="bg-muted/30">
							<CardHeader>
								<CardTitle className="text-lg">Post stats</CardTitle>
							</CardHeader>
							<CardContent className="grid gap-4 text-sm text-muted-foreground sm:grid-cols-3">
								<div>
									<p className="text-xs uppercase">Word count</p>
									<p className="text-base text-foreground">{wordStats.words}</p>
								</div>
								<div>
									<p className="text-xs uppercase">Reading time</p>
									<p className="text-base text-foreground">~{wordStats.readTime} min</p>
								</div>
								<div className="truncate">
									<p className="text-xs uppercase">Post id</p>
									<p className="text-base text-foreground">{post.$id}</p>
								</div>
							</CardContent>
						</Card>
					</CardContent>
				</Card>
			</section>

			<Dialog open={showDialog} onOpenChange={setShowDialog}>
				<DialogContent className="sm:max-w-[520px]">
					<DialogHeader>
						<DialogTitle>Edit Post</DialogTitle>
						<DialogDescription>
							Refine the title, author, or body before saving.
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4 p-4">
						<div className="grid items-center grid-cols-4 gap-4">
							<Label htmlFor="name" className="block col-span-4 text-left">
								Title
							</Label>
							<Input
								id="name"
								value={postData.title}
								onChange={(event) =>
									setPostData({ ...postData, title: event.target.value })
								}
								className="block col-span-4"
							/>
						</div>

						<Separator />

						<div className="grid items-center grid-cols-4 gap-4">
							<Label htmlFor="author" className="block col-span-4 text-left">
								Author
							</Label>
							<Input
								id="author"
								value={postData.username}
								onChange={(event) =>
									setPostData({ ...postData, username: event.target.value })
								}
								className="block col-span-4"
							/>
						</div>

						<Separator />

						<div className="grid items-center grid-cols-4 gap-4">
							<Label htmlFor="body" className="col-span-4 text-left">
								Body
							</Label>
							<Textarea
								id="body"
								className="w-full col-span-4 h-44"
								value={postData.body}
								onChange={(event) =>
									setPostData({ ...postData, body: event.target.value })
								}
							/>
						</div>
					</div>
					<DialogFooter>
						<Button type="submit" onClick={handleUpdate} disabled={isUpdating}>
							{isUpdating ? "Saving..." : "Save changes"}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			<AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you sure?</AlertDialogTitle>
						<AlertDialogDescription>
							This action cannot be undone. This will permanently delete{" "}
							<span className="text-gray-700 dark:text-gray-200">{postData.title}</span>.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter className="gap-3 mt-2">
						<AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
						<Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
							{isDeleting ? "Deleting..." : "Delete"}
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}
