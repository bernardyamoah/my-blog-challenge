'use client';

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { AddPost } from "@/components/addPost";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { formatTime } from "@/lib/functions";
import { getPosts } from "@/lib/getPosts";

export default function Home() {
	const [posts, setPosts] = useState<Post[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState("");
	const [authorFilter, setAuthorFilter] = useState("all");

	useEffect(() => {
		let cancelled = false;

		const fetchPosts = async () => {
			setIsLoading(true);
			try {
				const fetchedPosts = await getPosts();
				if (!cancelled) {
					setPosts(fetchedPosts);
				}
			} finally {
				if (!cancelled) setIsLoading(false);
			}
		};

		fetchPosts();
		return () => {
			cancelled = true;
		};
	}, []);

	const authors = useMemo(
		() => Array.from(new Set(posts.map((post) => post.username))),
		[posts]
	);

	const filteredPosts = useMemo(() => {
		return posts.filter((post) => {
			const matchesAuthor =
				authorFilter === "all" || post.username === authorFilter;
			const query = searchQuery.toLowerCase().trim();
			const matchesQuery =
				!query ||
				[post.title, post.body, post.username]
					.filter(Boolean)
					.some((field) => field.toLowerCase().includes(query));
			return matchesAuthor && matchesQuery;
		});
	}, [authorFilter, posts, searchQuery]);

	const handleAddPost = async (newPost: Post) => {
		setPosts((prevPosts) => [newPost, ...prevPosts]);
	};

	return (
		<section className="max-w-6xl px-6 pb-16 mx-auto">
			<header className="py-12 space-y-4 text-center">
				<p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
					Ideas, in motion
				</p>
				<h1 className="text-3xl font-semibold md:text-5xl">
					Latest posts from the community
				</h1>
				<p className="max-w-2xl mx-auto text-sm text-muted-foreground">
					Search by title, author, or content. Filter by author to quickly skim
					what matters to you.
				</p>
				<div className="flex flex-wrap items-center justify-center gap-3 pt-4">
					<div className="px-4 py-2 text-xs font-medium rounded-full bg-muted text-foreground">
						{posts.length} posts
					</div>
					<div className="px-4 py-2 text-xs font-medium rounded-full bg-muted text-foreground">
						{authors.length} authors
					</div>
					<AddPost onAddPost={handleAddPost} />
				</div>
			</header>

			<section className="flex flex-wrap items-center gap-4 p-4 mb-8 border rounded-lg bg-card">
				<div className="flex-1 min-w-[220px]">
					<label className="text-xs uppercase text-muted-foreground">Search</label>
					<Input
						placeholder="Find a post..."
						value={searchQuery}
						onChange={(event) => setSearchQuery(event.target.value)}
						className="mt-1"
					/>
				</div>

				<div className="min-w-[180px]">
					<label className="text-xs uppercase text-muted-foreground">Author</label>
					<select
						value={authorFilter}
						onChange={(event) => setAuthorFilter(event.target.value)}
						className="w-full px-3 py-2 mt-1 text-sm border rounded-md bg-background"
					>
						<option value="all">All authors</option>
						{authors.map((author) => (
							<option key={author} value={author}>
								{author}
							</option>
						))}
					</select>
				</div>
			</section>

			<main className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
				{isLoading &&
					Array.from({ length: 6 }).map((_, index) => (
						<div
							key={`skeleton-${index}`}
							className="h-48 border rounded-xl bg-muted/40 animate-pulse"
						/>
					))}

				{!isLoading && filteredPosts.length === 0 && (
					<div className="col-span-full p-10 text-center border rounded-xl bg-muted/30">
						<h3 className="mb-2 text-xl font-semibold">No posts found</h3>
						<p className="text-sm text-muted-foreground">
							Try adjusting your search or create the first post.
						</p>
						<div className="flex justify-center mt-4">
							<AddPost onAddPost={handleAddPost} />
						</div>
					</div>
				)}

				{!isLoading &&
					filteredPosts.map((post) => (
						<Card
							key={post.$id}
							className="relative flex flex-col h-full overflow-hidden shadow-md rounded-xl"
						>
							<Badge
								variant="outline"
								className="absolute text-[.65rem] top-4 shadow-sm right-4"
							>
								{formatTime(post.$createdAt)}
							</Badge>
							<CardHeader>
								<CardTitle className="flex justify-between text-xl capitalize line-clamp-2">
									{post.title}
								</CardTitle>
								<span className="text-xs font-medium text-amber-500">
									@{post.username}
								</span>
							</CardHeader>

							<CardContent className="flex-1">
								<p className="text-sm text-muted-foreground line-clamp-3">
									{post.body}
								</p>
							</CardContent>

							<CardFooter className="flex justify-end">
								<Link href={`/post/${post.$id}`} className="w-full">
									<Button className="w-full">Read more</Button>
								</Link>
							</CardFooter>
						</Card>
					))}
			</main>
		</section>
	);
}
