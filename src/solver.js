import { useState } from "react";
import { useForm } from "react-hook-form";
import parser from "./parser";
// ex -1x^2+50x+20
export default function Solver() {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState("");

  return (
    <form onSubmit={handleSubmit((data) => setData(parser(data.eq)))}>
      <input {...register("eq")} placeholder="Quadratic Equation" />
      <p>{data}</p>
      <input type="submit" />
    </form>
  );
}
