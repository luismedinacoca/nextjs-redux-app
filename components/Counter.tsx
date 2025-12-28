"use client";
import { Minus, Plus } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
import { increment, decrement } from "@/store/slices/counterSlice";
//import { RootState } from "@/store/store";
//import { useDispatch, useSelector } from "react-redux";
//import { useState } from "react";

const Counter = () => {
  //const [counter, setCounter] = useState(0);
  //const counter = useSelector((state: RootState) => state.counter.value);
  const counter = useAppSelector((state) => state.counter.value);
  //const dispatch = useDispatch();
  const dispatch = useAppDispatch();

  const handleIncrement = () => {
    //setCounter(counter + 1);
    dispatch(increment());
  };
  const handleDecrement = () => {
    //if (counter > 0) setCounter(counter - 1);
    if (counter > 0) dispatch(decrement());
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col justify-center items-center text-white">
      <h2 className="scroll-m-20 pb-6 text-3xl font-semibold tracking-tight first:mt-0">Redux Counter</h2>
      <div className="py-4">
        <div className="flex items-center space-x-6" dir="ltr">
          <button onClick={handleDecrement} className="px-4 py-2 rounded-e-lg rounded-full border-2 border-white">
            <Minus className="w-8 h-8" />
          </button>
          <p className="scroll-m-20 text-6xl font-semibold tracking-tight first:mt-0">{counter}</p>
          <button onClick={handleIncrement} className="px-4 py-2 rounded-s-lg rounded-full border-2 border-white">
            <Plus className="w-8 h-8" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Counter;
