import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";

const formSchema = z.object({
	name: z.string().min(2).max(80),
	email: z.string().email(),
});

export default function MailingForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			email: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			const response = await fetch("/api/addToMailing", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(values),
			});

			const data = await response.json();

			if (response.ok) {
				toast.success(data.message);
				form.reset();
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			toast.error("An error occurred. Please try again.");
		}
	}

	return (
		<Card className="bg-transparent border-none dark:bg-transparent flex flex-col items-center justify-center w-full py-12 md:py-24 lg:py-32 container px-4 md:px-6">
			<CardHeader className="space-y-4 text-center">
				<CardTitle className="text-3xl font-bold tracking-tighter sm:text-5xl">
					Join Our Mailing List
				</CardTitle>
				<CardDescription className="max-w-[700px] text-mate-muted-dark md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-mate-muted-light">
					Stay up-to-date with the latest news, updates, and exclusive offers.
				</CardDescription>
			</CardHeader>
			<CardContent className="p-0 w-full max-w-screen-md">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex space-x-2 gap-4 items-end"
					>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem className="space-y-2 flex-1">
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input
											placeholder="Enter your name"
											className="dark:bg-transparent dark:text-mate-white dark:border-mate-muted-light dark:text-mate-white dark:placeholder:text-mate-muted-light"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem className="space-y-2 flex-1">
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											placeholder="Enter your email"
											className="dark:bg-transparent dark:text-mate-white dark:border-mate-muted-light dark:text-mate-white dark:placeholder:text-mate-muted-light"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button className="shrink-0" type="submit">
							Subscribe
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
