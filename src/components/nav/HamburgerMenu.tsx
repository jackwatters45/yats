import {
	FileTextIcon,
	HamburgerMenuIcon,
	PersonIcon,
} from "@radix-ui/react-icons";
import type { ReactNode } from "react";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

// TODO sheet styling!
export default function HamburgerMenu() {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="ghost" className="p-2 h-fit">
					<HamburgerMenuIcon className="h-5 w-5" />
				</Button>
			</SheetTrigger>
			<SheetContent>
				<div className="grid gap-4 py-4">
					<Accordion type="multiple">
						<a
							href="/"
							className="flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline"
						>
							Home
						</a>
						<Separator className="dark:bg-mate-white/10" />
						<AccordionItem value="item-1">
							<AccordionTrigger>Products</AccordionTrigger>
							<AccordionContent className="space-y-3">
								<HamburgerDropdownItem
									description="Easily send targeted bulk messages to your informal teams"
									href="https://team-send.jackwatters.dev/"
									title="Team Send"
									Icon={
										<img
											src="https://res.cloudinary.com/drheg5d7j/image/upload/v1713845385/Yats-logo-no-background_b9zh7w.webp"
											alt="Team Send"
											className="p-1 mb-1"
										/>
									}
								/>
								<Separator className="dark:bg-mate-white/10" />
								<HamburgerDropdownItem
									title="Música Pa Que"
									description="A better way to share music. Coming soon..."
									href="#"
									Icon={
										<img
											src="https://res.cloudinary.com/drheg5d7j/image/upload/v1713998845/Yats_Logo_Red__1_-removebg-preview_3_jc8kjo.webp"
											alt="Música Pa Que"
											className="mb-1"
										/>
									}
								/>
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-2">
							<AccordionTrigger>Resources</AccordionTrigger>
							<AccordionContent className="space-y-3">
								<HamburgerDropdownItem
									title="About Us"
									description="Driven by passion, guided by values"
									href="/about"
									Icon={<PersonIcon width={30} height={30} className="mt-1" />}
								/>
								<Separator className="dark:bg-mate-white/10" />
								<HamburgerDropdownItem
									title="Stories"
									description="Tips,tTrends, and thought leadership"
									href="/blog"
									Icon={
										<FileTextIcon width={30} height={30} className="mt-1" />
									}
								/>
							</AccordionContent>
						</AccordionItem>
						<a
							href="/contact-us"
							className="flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline"
						>
							Contact Us
						</a>
					</Accordion>
				</div>
			</SheetContent>
		</Sheet>
	);
}

function HamburgerDropdownItem({
	title,
	description,
	href,
	Icon,
}: {
	title: string;
	description: string;
	href: string;
	Icon: ReactNode;
}) {
	return (
		<li className="row-span-3 py-0 hover:bg-mate-muted-light/10 dark:hover:bg-muted-dark/5 h-fit rounded-md">
			<a
				className="flex h-full w-full select-none items-center gap-3 rounded-md p-6 no-underline outline-none focus:shadow-md py-4 px-4"
				href={href}
			>
				<div className="max-w-10">{Icon}</div>
				<div>
					<div className="text-base">{title}</div>
					<p className="text-xs leading-tight text-mate-muted-light dark:text-mate-muted-light">
						{description}
					</p>
				</div>
			</a>
		</li>
	);
}
