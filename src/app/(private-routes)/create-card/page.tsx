"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FlashcardInput } from "@/components/ui/flashcard-input";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useScrollPosition } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";
import { Image, Plus, Trash2 } from "lucide-react";
import React, { Fragment, useState } from "react";

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

  const [cardObj, setCardObj] = useState([
    { id: 1, term: "Card 1 term ", defination: "Card 1 defination", img: "" },
    { id: 2, term: "Card 2 term ", defination: "Card 2 defination", img: "" },
  ]);

  return (
    <div className="flex w-full bg-accent pb-20">
      <div className="flex flex-col items-center w-full mx-auto relative ">
        <div
          className={cn(
            "flex w-full justify-around items-center sticky top-0 left-0 py-6 gap-32",
            scrollClass
          )}
        >
          <div className="text-2xl font-bold">Create a new flashcard deck</div>
          <Button size="lg" className="rounded-3xl">
            Create
          </Button>
        </div>

        <div className="flex flex-col items-center w-full max-w-7xl px-6 py-6 gap-6">
          {/* deck title-description  */}
          <div className="flex flex-col w-full gap-6">
            <div className="flex flex-col gap-2">
              <Label className="pl-6 text-lg" htmlFor="title">
                Title
              </Label>
              <Input
                id="title"
                className="h-14 rounded-full px-8 bg-background text-lg placeholder:font-semibold font-semibold"
                placeholder="Enter deck title, like : 'Biology - Chapter 22'"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label className="pl-6 text-lg" htmlFor="description">
                Description
              </Label>
              <Input
                id="description"
                className="h-14 rounded-full px-8 bg-background text-lg placeholder:font-semibold font-semibold"
                placeholder="Enter description about deck"
              />
            </div>
          </div>

          {/* deck definations  */}
          <div className="flex flex-col w-full gap-6 mt-10">
            {cardObj.map((card) => (
              <Fragment key={card.id}>
                <FlashCardInputComponent card={card} />
              </Fragment>
            ))}
          </div>

          {/* add card button */}
          <button className="flex text-primary hover:underline underline-offset-4 p-6 gap-1 justify-center items-center w-full bg-card rounded-xl h-20 border shadow text-xl font-semibold hover:font-bold transition-all duration-75">
            <p>Add Card </p>
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

const FlashCardInputComponent = ({ card }: { card: cardInterface }) => {
  return (
    <Card className="">
      <CardHeader className="py-4">
        <CardTitle className="flex justify-between items-center px-1">
          <div>{card.id}</div>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="hover:bg-black/10 rounded-full p-1.5">
                <Trash2 className="w-5 h-6" />
              </TooltipTrigger>
              <TooltipContent className="p-2 text-sm">
                <p>Delete this card</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
      </CardHeader>

      <hr className="m-0 p-0" />

      <CardContent className="flex justify-between items-center gap-8 py-4">
        <FlashcardInput placeholder="Enter a term" />
        <FlashcardInput placeholder="Enter defination" />

        <button className="w-[6%] p-2 flex flex-col justify-center items-center border border-dashed text-muted-foreground font-semibold">
          <Image className="w-4 h-4" />
          <p>Image</p>
        </button>
      </CardContent>
    </Card>
  );
};
