import { FileTextIcon, PersonIcon } from "@radix-ui/react-icons";
import type { ReactNode } from "react";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { Separator } from "../ui/separator";

export default function NavMenu() {
	return (
		<NavigationMenu>
			<NavigationMenuList className="flex items-center justify-center w-full">
				<NavigationMenuItem>
					<NavigationMenuTrigger>Products</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid gap-3 md:w-[360px] lg:w-[360px] p-3  shadow-2xl drop-shadow-2xl">
							<NavDropdownItem
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
							<NavDropdownItem
								title="Música Pa Que"
								description="A better way to share music. Coming soon..."
								href="#"
								Icon={
									<img
										src="https://res.cloudinary.com/drheg5d7j/image/upload/v1713999196/Yats_Logo_Red__1_-removebg-preview_3_viyrsm.webp"
										alt="Música Pa Que"
										className="mb-1"
									/>
								}
							/>
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuTrigger>Resources</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid gap-3 md:w-[360px] lg:w-[360px] p-3  shadow-2xl drop-shadow-2xl">
							<NavDropdownItem
								title="About Us"
								description="Driven by passion, guided by values"
								href="/about"
								Icon={<PersonIcon width={30} height={30} className="mt-1" />}
							/>
							<Separator className="dark:bg-mate-white/10" />
							<NavDropdownItem
								title="Stories"
								description="Tips,tTrends, and thought leadership"
								href="/blog"
								Icon={<FileTextIcon width={30} height={30} className="mt-1" />}
							/>
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuLink
						href="/contact-us"
						className="inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-stone-100 hover:text-stone-900 focus:bg-stone-100 focus:text-stone-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:bg-transparent dark:hover:bg-mate-grey dark:hover:text-mate-white dark:focus:bg-mate-grey dark:focus:text-mate-white"
					>
						Contact Us
					</NavigationMenuLink>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
}

function NavDropdownItem({
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
			<NavigationMenuLink
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
			</NavigationMenuLink>
		</li>
	);
}
