import { useContext } from "react";
import { AuthContext } from "../hook/AuthContext";

export default function (status) {
  const { signOut } = useContext(AuthContext);
  if (status == "401") {
		signOut();

  }

}
