import React, { useEffect } from "react";
import { fetchRequest, MovieResponse, MovieResult } from "../common/api";
import { ENDPOINT } from "../common/endpoints";
import Banner from "../components/Banner";
import ContentRow from "../components/content-rows";

export default function Browse() {
  return (
    <section className="absolute top-0">
      <Banner />
      <ContentRow
        endpoint={ENDPOINT.MOVIES_POPULAR}
        title="Popular"
      ></ContentRow>
      <ContentRow
        endpoint={ENDPOINT.MOVIES_TOP_RATED}
        title="Top Rated"
      ></ContentRow>
      <ContentRow
        endpoint={ENDPOINT.MOVIES_NOW_PLAYING}
        title="Now Playing"
      ></ContentRow>
    </section>
  );
}
