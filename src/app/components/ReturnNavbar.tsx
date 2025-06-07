"use client";

import ArrowBack from "./ArrowBack";
import UserAvatar from "./UserAvatar";

export default function ReturnNavbar(): React.JSX.Element {
    return (
        <div className="return-nav">
            <ArrowBack />
            <UserAvatar />
        </div>
    )
}