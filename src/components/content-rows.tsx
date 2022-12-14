import React, { useEffect, useRef, useState } from "react";
import { fetchRequest, MovieResponse, MovieResult } from "../common/api";
import { ENDPOINT } from "../common/endpoints";
import ChevronLeft from "@heroicons/react/24/outline/ChevronLeftIcon";
import ChevronRight from "@heroicons/react/24/outline/ChevronRightIcon";
import PageIndicator from "./page-indicator";
import MovieCard from "./movie-card";

type RowProp = {
  endpoint: string;
  title: string;
};

const CARD_WIDTH = 200;

export default function ContentRows({ title, endpoint }: RowProp) {
  const sliderRef = useRef<HTMLSelectElement>(null);
  const containerRef = useRef<HTMLSelectElement>(null);

  const [rowData, setRowData] = useState<MovieResult[]>([]);
  const [translateX, setTranslateX] = useState(0);
  const [pagesCount, setPagesCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const cardsPerPage = useRef(0);
  const disablePrev = currentPage === 0;
  const disableNext = currentPage + 1 === pagesCount;
  async function fetchRowData() {
    const response = await fetchRequest<MovieResponse<MovieResult[]>>(endpoint);

    setRowData(response.results.filter((res) => res.poster_path));
  }

  // function createImageURL(path: string, width: number) {
  //   return `${import.meta.env.VITE_BASE_IMAGE_URI}/w${width}${path}`;
  // }

  function onNextClick() {
    if (sliderRef.current) {
      let updatedTranslateX = translateX - getTranslateXValue();
      sliderRef.current.style.transform = `translateX(${updatedTranslateX}%)`;
      setTranslateX(updatedTranslateX);
      setCurrentPage(currentPage + 1);
    }
  }

  function onPrevClick() {
    if (sliderRef.current) {
      let updatedTranslateX = translateX + getTranslateXValue();
      sliderRef.current.style.transform = `translateX(${updatedTranslateX}%)`;
      setTranslateX(updatedTranslateX);
      setCurrentPage(currentPage - 1);
    }
  }

  function getTranslateXValue() {
    let translateX = 0;
    if (sliderRef.current) {
      translateX =
        ((cardsPerPage.current * CARD_WIDTH) / sliderRef.current.clientWidth) *
        100;
    }
    return translateX;
  }

  //cards perpage
  useEffect(() => {
    if (rowData?.length) {
      if (containerRef.current) {
        cardsPerPage.current = Math.floor(
          containerRef.current.clientWidth / CARD_WIDTH
        );
        //how many pages are there in each row
        setPagesCount(Math.ceil(rowData.length / cardsPerPage.current));
      }
    }
  }, [rowData.length]);

  useEffect(() => {
    fetchRowData();
  }, []);

  return (
    <section className="row-container ml-12 hover:cursor-pointer ">
      <h2 className="text-xl">{title}</h2>
      <PageIndicator
        className="mb-4 opacity-0 transition-opacity duration-300 ease-in"
        pagesCount={pagesCount}
        currentPage={currentPage}
      />
      {/* <ul className="mb-4 flex items-center justify-end gap-1 pr-4 opacity-0 transition-opacity duration-300 ease-in">
        {Array(pagesCount)
          .fill(0)
          .map((page, index) => (
            <li
              className={`h-[2px]  w-3 ${
                currentPage === index ? "bg-gray-100" : " bg-gray-600"
              }`}
              key={index}
            ></li>
          ))}
      </ul> */}
      <section
        ref={containerRef}
        className="relative mb-8 flex flex-nowrap gap-2 overflow-hidden"
      >
        {!disablePrev ? (
          <button
            className="absolute z-[1]  h-full w-12 bg-black/25 opacity-0 transition-opacity duration-300 ease-in"
            onClick={onPrevClick}
          >
            <ChevronLeft />
          </button>
        ) : null}
        {!disableNext ? (
          <button
            className="absolute right-0 z-[1] h-full w-12 bg-black/25 opacity-0 transition-opacity duration-300 ease-in"
            onClick={onNextClick}
          >
            <ChevronRight />
          </button>
        ) : null}
        <section
          ref={sliderRef}
          className=" flex gap-2 transition-transform duration-700 ease-linear"
        >
          {rowData?.map((row, index) => {
            //const { id, title, poster_path } = row;
            console.log(row);
            return (
              <MovieCard
                uid={`${row.id}-${title}`}
                key={`${row.id}-${title}`}
                {...row}
              />
              // <section
              //   key={id}
              //   className="aspect-square flex-none overflow-hidden rounded-md"
              // >
              //   <img
              //     className="h-full w-full"
              //     src={createImageURL(poster_path, CARD_WIDTH)}
              //     alt={title}
              //   />
              // </section>
            );
          })}
        </section>
      </section>
    </section>
  );
}
