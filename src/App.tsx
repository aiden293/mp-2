// File: App.tsx
// Author: SangHyup Lee
// Description: Parent component responsible for retrieving data from the Dog CEO API using React Hooks.


import styled from "styled-components";
import { useEffect, useState } from "react";
import DogGallery from "./components/DogSet";
import type { DogCard } from "./interfaces/Dog";

const ParentDiv = styled.div`
  width: 80vw;
  margin: auto;
  border: 5px darkgoldenrod solid;
`;

function parseBreedFromUrl(url: string): { breed: string; subBreed: string } {
  const marker = "/breeds/";
  const idx = url.indexOf(marker);
  if (idx === -1) return { breed: "unknown", subBreed: "" };

  const after = url.slice(idx + marker.length);
  const folder = after.split("/")[0]; 
  const parts = folder.split("-");

  if (parts.length >= 2) {
    return { breed: parts[0], subBreed: parts.slice(1).join("-") };
  }
  return { breed: folder, subBreed: "" };
}

export default function App() {
  const [data, setData] = useState<DogCard[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);

    fetch("https://dog.ceo/api/breeds/image/random/12")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json: { message: string[]; status: string }) => {
        const cards: DogCard[] = json.message.map((url, i) => {
          const { breed, subBreed } = parseBreedFromUrl(url);
          return { id: i + 1, url, breed, subBreed };
        });
        setData(cards);
      })
      .then(() => console.log("Data fetched successfully"))
      .catch((e: Error) => {
        console.log("There was the error: " + e);
        setError(e.message);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <ParentDiv>
      {loading ? <p>Loading...</p> : null}
      {error ? <p>Error: {error}</p> : null}
      <DogGallery data={data} />
    </ParentDiv>
  );
}