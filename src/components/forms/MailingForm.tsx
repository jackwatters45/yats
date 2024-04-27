import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
} from "../ui/card";
import { Input } from "../ui/input";
import { toast } from "../ui/use-toast";

const formSchema = z.object({
	name: z.string().min(2).max(80),
	email: z.string().email(),
});

export type MailingFormSchema = z.infer<typeof formSchema>;

export default function MailingForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			email: "",
		},
	});

	async function onSubmit(values: MailingFormSchema) {
		try {
			const response = await fetch("/api/mailing-list", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(values),
			});

			const data = await response.json();

			if (response.ok) {
				toast({
					description: "You have successfully subscribed to our mailing list!",
				});
				form.reset();
			} else {
				toast({
					title: "An error occurred. Please try again.",
					description: `Error: ${data.message ?? "unknown"}`,
					variant: "destructive",
				});
			}
		} catch (error) {
			toast({
				title: "An error occurred. Please try again.",
				description: `Error: ${error ?? "unknown"}`,
				variant: "destructive",
			});
		}
	}

	return (
		<Card className="bg-transparent border-none dark:bg-transparent flex flex-col items-center justify-center w-full py-12 md:py-24 lg:py-32 container px-4 md:px-6 shadow-none">
			<CardHeader className="space-y-4 text-center">
				<CardTitle className="text-3xl font-bold tracking-tighter sm:text-5xl">
					Join Our Mailing List
				</CardTitle>
				<CardDescription className="max-w-[700px] text-mate-muted-dark md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-mate-muted-light">
					Stay up-to-date with the latest news, updates, and exclusive offers.
				</CardDescription>
			</CardHeader>
			<CardContent className="px-4 w-full max-w-screen-md">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex flex-col sm:flex-row space-x-2 gap-4 w-full items-end "
					>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem className="space-y-2 flex-1 w-full">
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
								<FormItem className="space-y-2 flex-1 w-full">
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
						<div className="w-full sm:w-fit pt-4 sm:pt-0">
							<Button className="w-full sm:w-fit " type="submit">
								Subscribe
							</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
