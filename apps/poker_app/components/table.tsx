// import { Card } from "@/components/ui/card"
// import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// interface Person {
//     name: string,
//     avatar: string
// }

// const users: Person[] = [
//     { name: "Alice", avatar: "https://example.com/avatars/alice.png" },
//     { name: "Bob", avatar: "https://example.com/avatars/bob.png" },
//     { name: "Charlie", avatar: "https://example.com/avatars/charlie.png" },
//     { name: "Diana", avatar: "https://example.com/avatars/diana.png" },
//     { name: "Eve", avatar: "https://example.com/avatars/eve.png" },
//     { name: "Frank", avatar: "https://example.com/avatars/frank.png" },
//     { name: "Grace", avatar: "https://example.com/avatars/grace.png" },
//     { name: "Hank", avatar: "https://example.com/avatars/hank.png" },
//     { name: "Ivy", avatar: "https://example.com/avatars/ivy.png" },
//     { name: "Jack", avatar: "https://example.com/avatars/jack.png" },
// ];

// const topUsers = users.slice(0, Math.ceil(users.length / 2));
// const bottomUsers = users.slice(Math.ceil(users.length / 2));

// export default function table() {
//     return (
//         <div className="relative w-full min-h-screen flex items-center justify-center">
//             {/* Oval Table */}
//             <Card className="w-[550px] h-[250px] rounded-full bg-red-900 z-10"></Card>
//             {/* Top Side - 5 People */}
//             <div className="absolute top-[calc(50%-165px)] flex space-x-11 z-20">
//                 {topUsers.map((user, i) => (
//                     <Avatar key={`top-${i}`}>
//                         <AvatarFallback className="bg-blue-600 text-white">{user.name.charAt(0)}</AvatarFallback>
//                     </Avatar>
//                 ))}

//             </div>

//             {/* Bottom Side - 5 People */}
//             <div className="absolute bottom-[calc(50%-165px)] flex space-x-11 z-20">
//                 {bottomUsers.map((user, i) => (
//                     <Avatar key={`top-${i}`}>
//                         <AvatarFallback className="bg-blue-600 text-white">{user.name.charAt(0)}</AvatarFallback>
//                     </Avatar>
//                 ))}
//             </div>

//             {/* Special Member (SM) Chair */}
//             <div className="absolute left-[calc(50%-340px)] top-1/2 -translate-y-1/2 z-30">
//                 <Avatar>
//                     <AvatarFallback className="bg-green-700 text-white">SM</AvatarFallback>
//                 </Avatar>
//             </div>
//         </div>
//     )
// }
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const topUsers = [
    { name: "Alice" },
    { name: "Bob" },
    { name: "Charlie" },
    { name: "Diana" },
    { name: "Eve" },
]

const bottomUsers = [
    { name: "Frank" },
    { name: "Grace" },
    { name: "Hank" },
    { name: "Ivy" },
    { name: "Jack" },
];

export default function GridTableLayout() {
    return (
        <div className="grid place-items-center min-h-150 relative">
            {/* Grid container with table and participants */}
            <div className="grid grid-rows-[auto_auto_auto] grid-cols-[auto_auto_auto] gap-5 items-center justify-center ">

                {/* Top row (topUsers) */}
                <div className="col-span-3 flex justify-center space-x-10 ">
                    {topUsers.map((user, i) => (
                        <Avatar key={`top-${i}`}>
                            <AvatarFallback className="bg-blue-600 text-white">
                                {user.name.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                    ))}
                </div>

                {/* Middle row (left SM + Table + right empty for balance) */}
                <div className="flex justify-center ">
                    <Avatar>
                        <AvatarFallback className="bg-green-700 text-white">SM</AvatarFallback>
                    </Avatar>
                </div>

                <div className="">
                    <Card className="w-[550px] h-[250px] rounded-full bg-red-900" />
                </div>

                <div /> {/* Right spacer for layout symmetry */}

                {/* Bottom row (bottomUsers) */}
                <div className="col-span-3 flex justify-center space-x-10">
                    {bottomUsers.map((user, i) => (
                        <Avatar key={`bottom-${i}`}>
                            <AvatarFallback className="bg-blue-600 text-white">
                                {user.name.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                    ))}
                </div>
            </div>
        </div>
    );
}

