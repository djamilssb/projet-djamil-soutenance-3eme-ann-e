"use client";

import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

export default function ArrowBack(): React.JSX.Element {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <button onClick={handleBack}>
      <FontAwesomeIcon icon={faArrowLeft} size="3x" className="p-4 text-[var(--secondary-color)] hover:text-[var(--hover-secondary)] cursor-pointer"></FontAwesomeIcon>
    </button>
  );
}
