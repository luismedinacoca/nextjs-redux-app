"use client";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const CounterValue = () => {
  const counter = useSelector((state: RootState) => state.counter.value);
  console.log("CounterValue", counter);
  return (
    <div>
      <h1>{counter}</h1>
    </div>
  );
};

export default CounterValue;
