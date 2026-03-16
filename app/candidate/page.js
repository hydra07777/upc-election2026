import { Suspense } from "react";
import CandidateClient from "./CandidateClient";

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CandidateClient />
        </Suspense>
    );
}