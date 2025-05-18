import FibonacciCards from "@/components/fibonacci"
import TableComponent from "@/components/table"
import { PageProps } from "./interface"
import Composite from "@/components/composite";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Teams",
    description: "Teams page",
};

export default async function Table({ params }: any) {

    return (

        <div className="min-h-screen">
            <Composite team={params.team}>
                <div className="flex flex-row min-h-max justify-around">
                    <div className="w-full">
                        <TableComponent></TableComponent>
                    </div>
                </div>
                <FibonacciCards></FibonacciCards>
            </Composite>
        </div >
    )
}