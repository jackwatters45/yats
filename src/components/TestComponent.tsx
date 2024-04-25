import { FileTextIcon, PersonIcon } from "@radix-ui/react-icons";
import type { ReactNode } from "react";
import { Separator } from "./ui/separator";

export default function TestComponent() {
	return (
		<ul className="grid gap-3 md:w-[360px] lg:w-[360px] p-3  shadow-2xl  drop-shadow-2xl">
			<NavDropdownItem
				title="About Us"
				description="Driven by passion, guided by values"
				href="/about"
				Icon={<PersonIcon width={32} height={32} className="mt-1" />}
			/>
			<Separator className="dark:bg-mate-white/10" />
			<NavDropdownItem
				title="Stories"
				description="Tips,tTrends, and thought leadership"
				href="/blog"
				Icon={<FileTextIcon width={32} height={32} className="mt-1" />}
			/>
		</ul>
	);
}

export function NavDropdownItem({
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
					<p className="text-sm leading-tight text-mate-muted-light dark:text-mate-muted-light">
						{description}
					</p>
				</div>
			</a>
		</li>
	);
}
