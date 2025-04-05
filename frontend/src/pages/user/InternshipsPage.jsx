import React from "react";
import Internship_R from "../../components/Internship_R";
import InternshipsB from "../../components/InternshipsB";
import Jobs_B from "../../components/Jobs_B";
import { useEffect } from "react";

const InternshipsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <InternshipsB />
      <Internship_R />
      <Jobs_B />
    </div>
  );
};

export default InternshipsPage;
