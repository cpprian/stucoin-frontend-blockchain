"use client"

import { LoginButton } from "components/auth/login-button";
import { ModeToggle } from "components/mode-toggle";
import { Button } from "components/ui/button";
import { Logo } from "../../../components/marketing/logo";

export const Navbar = () => {
    return (
        <div className="z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6">
            <Logo />
            <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-4">
                <LoginButton asChild>
                    <Button variant="outline">
                        Sign In
                    </Button>
                </LoginButton>
                <ModeToggle />
            </div>
        </div>
    );
};