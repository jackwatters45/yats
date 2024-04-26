import { zodResolver } from "@hookform/resolvers/zod";
import parsePhoneNumber, {
	isPossiblePhoneNumber,
	isValidPhoneNumber,
	validatePhoneNumberLength,
} from "libphonenumber-js";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./ui/card";
import { Textarea } from "./ui/textarea";
import { toast } from "./ui/use-toast";

const formSchema = z.object({
	firstName: z.string().min(1).max(40),
	lastName: z.string().min(2).max(40),
	companyName: z.string().max(50).optional(),
	email: z.string().email(),
	message: z.string().min(1).max(500),
	phone: z
		.string()
		.max(15)
		.optional()
		.transform((val) =>
			val ? parsePhoneNumber(val)?.formatInternational() : undefined,
		)
		.refine((val) => {
			if (!val) return true;

			const isPossible = isPossiblePhoneNumber(val);
			const isValid = isValidPhoneNumber(val);
			const isValidLength = validatePhoneNumberLength(val);

			return isPossible && isValid && isValidLength;
		}),
});

export type ContactFormSchema = z.infer<typeof formSchema>;

export default function ContactForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			companyName: "",
			email: "",
			phone: "",
			message: "",
		},
	});

	const [formError, setFormError] = useState<string | null>(null);

	async function onSubmit(rawFormData: z.infer<typeof formSchema>) {
		const formData = {
			...rawFormData,
			companyName: rawFormData.companyName ?? undefined,
			phone: rawFormData.phone ?? undefined,
		};

		console.log(JSON.stringify(formData));

		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		let response: any;
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		let data: any;
		try {
			response = await fetch("/api/contact-request", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});

			data = await response.json();

			if (response.ok) {
				toast({ description: "Your message has been sent successfully!" });
				form.reset();
			} else {
				toast({
					title: "An error occurred. Please try again.",
					description: `Error: ${data.message ?? "unknown"}`,
					variant: "destructive",
				});
				setFormError(data.message);
			}
		} catch (error) {
			toast({
				title: "An error occurred. Please try again.",
				description: `Error: ${error ?? "unknown"}`,
				variant: "destructive",
			});
			// setFormError('An error occurred. Please try again.');
			const debug = JSON.stringify({ formData, response, data, error });
			setFormError(debug);
		}
	}

	return (
		<Card className="bg-transparent dark:bg-transparent border-transparent space-y-4 md:min-w-[600px]">
			<CardHeader className="space-y-4">
				<CardTitle className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
					Contact Our Team
				</CardTitle>
				<CardDescription className="text-mate-muted-dark text-base dark:text-mate-muted-light">
					Fill out the form below and we'll get back to you as soon as possible.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<div className="space-y-4">
							<div className="space-y-4">
								<div className="grid grid-cols-2 gap-4">
									<FormField
										control={form.control}
										name="firstName"
										render={({ field }) => (
											<FormItem>
												<FormLabel>First Name *</FormLabel>
												<FormControl>
													<Input
														placeholder="Aurelliano"
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
										name="lastName"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Last Name *</FormLabel>
												<FormControl>
													<Input
														placeholder="Buendía"
														className="dark:bg-transparent dark:text-mate-white dark:border-mate-muted-light dark:text-mate-white dark:placeholder:text-mate-muted-light"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							</div>
							<FormField
								control={form.control}
								name="companyName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Company Name (optional)</FormLabel>
										<FormControl>
											<Input
												placeholder="Revolutionary Guard of Macondo"
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
									<FormItem>
										<FormLabel>Email *</FormLabel>
										<FormControl>
											<Input
												placeholder="aurellianobuendía@macondo.com"
												type="email"
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
								name="phone"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Phone (optional)</FormLabel>
										<FormControl>
											<Input
												placeholder="+1 312-555-9821"
												type="tel"
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
								name="message"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Message *</FormLabel>
										<FormControl>
											<Textarea
												placeholder="Enter your message"
												{...field}
												className="dark:bg-transparent dark:text-mate-white dark:border-mate-muted-light dark:text-mate-white dark:placeholder:text-mate-muted-light"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormDescription>
								Fields marked with an asterisk (*) are required.
							</FormDescription>
							<div className="flex justify-between items-center gap-4">
								<Button>Contact Our Team</Button>
								{formError && <FormMessage>{formError}</FormMessage>}
							</div>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
