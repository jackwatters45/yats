import { motion } from "framer-motion";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { Separator } from "./ui/separator";

export default function Navbar() {
	return (
		<nav className="fixed z-50 flex h-16 w-full items-center justify-center border-b  backdrop-blur-lg dark:border-mate-white/10">
			<div className="flex w-full max-w-screen-xl items-center justify-between px-6">
				<NavigationMenuItem>
					<a href="/" aria-label="Home" className="flex items-center gap-2">
						<img
							src="https://res.cloudinary.com/drheg5d7j/image/upload/v1713829143/YATS_favicon_diyjqu.webp"
							alt="Company Logo"
							className="h-8 w-8 object-cover mb-1"
						/>
						<h1 className=" text-xl font-semibold">YATS</h1>
					</a>
				</NavigationMenuItem>
				<NavigationMenu>
					<NavigationMenuList className="flex items-center justify-center w-full">
						<NavigationMenuItem data-state="open">
							<NavigationMenuTrigger data-state="open">
								Products
							</NavigationMenuTrigger>
							<NavigationMenuContent data-state="open">
								<ul className="grid gap-3 md:w-[360px] lg:w-[360px] p-3 bg-mate-white dark:bg-mate-grey shadow-2xl ring-4 drop-shadow-2xl">
									<NavDropdownItem
										src="https://res.cloudinary.com/drheg5d7j/image/upload/v1713845385/Yats-logo-no-background_b9zh7w.webp"
										title="Team Send"
										description="Easily send targeted bulk messages to your informal teams"
										href="https://team-send.jackwatters.dev/"
									/>
									<Separator className="dark:bg-mate-white/10" />
									<NavDropdownItem
										src="https://res.cloudinary.com/drheg5d7j/image/upload/v1713845385/Yats-logo-no-background_b9zh7w.webp"
										title="something three.js related.."
										description="Coming soon..."
										href="#"
									/>
								</ul>
							</NavigationMenuContent>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
							<NavigationMenuContent>
								<ul className="grid gap-3 md:w-[360px] lg:w-[360px] p-3 bg-mate-white dark:bg-mate-grey shadow-2xl ring-4 drop-shadow-2xl">
									<NavDropdownItem
										src="https://res.cloudinary.com/drheg5d7j/image/upload/v1713845385/Yats-logo-no-background_b9zh7w.webp"
										title="About Us"
										description="lorem ipsum"
										href="/about"
									/>
									<Separator className="dark:bg-mate-white/10" />
									<NavDropdownItem
										src="https://res.cloudinary.com/drheg5d7j/image/upload/v1713845385/Yats-logo-no-background_b9zh7w.webp"
										title="About Us"
										description="lorem ipsum"
										href="/about"
									/>
								</ul>
							</NavigationMenuContent>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<NavigationMenuTrigger>Resources</NavigationMenuTrigger>
							<NavigationMenuContent>
								<ul className="grid gap-3 md:w-[360px] lg:w-[360px] p-3 bg-mate-white dark:bg-mate-grey shadow-2xl ring-4 drop-shadow-2xl">
									<NavDropdownItem
										src="https://res.cloudinary.com/drheg5d7j/image/upload/v1713845385/Yats-logo-no-background_b9zh7w.webp"
										title="About Us"
										description="lorem ipsum"
										href="/about"
									/>
									<Separator className="dark:bg-mate-white/10" />
									<NavDropdownItem
										src="https://res.cloudinary.com/drheg5d7j/image/upload/v1713845385/Yats-logo-no-background_b9zh7w.webp"
										title="Stories"
										description="lorem ipsum"
										href="/blog"
									/>
								</ul>
							</NavigationMenuContent>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>
				<div className="flex items-center gap-2">
					<a
						href="https://github.com/Yats-co"
						className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-stone-950 dark:focus-visible:ring-stone-300 hover:bg-stone-100 hover:text-stone-900 dark:hover:bg-stone-700/50 dark:hover:text-stone-50 rounded-full px-2 py-2"
					>
						<img
							src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg"
							alt="Github"
							className="w-6 h-6 dark:invert"
						/>
					</a>
				</div>
			</div>
		</nav>
	);
}

function NavDropdownItem({
	src,
	title,
	description,
	href,
}: {
	src: string;
	title: string;
	description: string;
	href: string;
}) {
	return (
		<li className="row-span-3 py-0 hover:bg-stone-200/40 dark:hover:bg-mate-white/5 h-fit rounded-md">
			<NavigationMenuLink
				className="flex h-full w-full select-none items-center gap-3 rounded-md p-6 no-underline outline-none focus:shadow-md py-4 px-4"
				href={href}
			>
				<img src={src} alt="" className="h-fit w-6 object-cover mb-1 " />
				<div className="h-fit">
					<div className="text-base">{title}</div>
					<p className="text-sm leading-tight text-mate-muted-light dark:text-mate-muted-light">
						{description}
					</p>
				</div>
			</NavigationMenuLink>
		</li>
	);
}
