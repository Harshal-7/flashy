"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useScrollPosition } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import React, { Fragment } from "react";

const cardObject = [
  { id: 1, term: "Card 1 term ", defination: "Card 1 defination", img: "" },
  { id: 2, term: "Card 2 term ", defination: "Card 2 defination", img: "" },
  { id: 3, term: "Card 3 term ", defination: "Card 3 defination", img: "" },
  { id: 4, term: "Card 4 term ", defination: "Card 4 defination", img: "" },
];

interface cardInterface {
  id: number;
  term: string;
  defination: string;
  img: string;
}

export default function CareteCard() {
  const isScrolled = useScrollPosition();
  const scrollClass = isScrolled
    ? "shadow bg-background transition-all duration-300 ease-in-out"
    : "shadow-none bg-accent transition-all duration-300 ease-in-out";

  return (
    <div className="flex w-full bg-accent">
      <div className="flex flex-col items-center w-full  mx-auto relative ">
        <div
          className={cn(
            "flex w-full justify-around items-center sticky top-0 left-0 py-6 gap-32  ",
            scrollClass
          )}
        >
          <div className="text-2xl font-bold">Create a new flashcard deck</div>
          <Button size="lg" className="rounded-3xl">
            Create
          </Button>
        </div>

        <div className="flex flex-col items-center w-full max-w-7xl px-6 py-6 gap-20">
          {/* deck title-description  */}
          <div className="flex flex-col w-full gap-6">
            <Input
              className="h-14 rounded-full px-8 bg-background text-lg placeholder:font-semibold"
              placeholder="Enter deck title, like : 'Biology - Chapter 22'"
            />
            <Input
              className="h-14 rounded-full px-8 bg-background text-lg placeholder:font-semibold"
              placeholder="Enter description about deck"
            />
          </div>

          {/* deck definations  */}
          <div className="flex flex-col w-full gap-6">
            {cardObject.map((card) => (
              <Fragment key={card.id}>
                <FlashCardInputComponent card={card} />
              </Fragment>
            ))}
          </div>

          {/* add card button */}
          <div className="flex flex-col w-full p-4"></div>
        </div>
      </div>
    </div>
  );
}

const FlashCardInputComponent = ({ card }: { card: cardInterface }) => {
  const handleDelete = (card: cardInterface) => {
    const arr = cardObject.filter((cardObjArr) => cardObjArr.id !== card.id);
    console.log("Item deleted", card.id);
    console.log("Item deleted", arr);
  };

  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <div>{card.id}</div>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <button onClick={() => handleDelete(card)}>
                  <Trash2 className="w-5 h-6" />
                </button>
              </TooltipTrigger>
              <TooltipContent className="p-2 text-sm">
                <p>Delete this card</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
      </CardHeader>
      <hr className="mb-6" />
      <CardContent className="flex justify-between gap-3">
        <div>{card.term}</div>
        <div>{card.defination}</div>
        <div>{card.img}</div>
      </CardContent>
    </Card>
  );
};
