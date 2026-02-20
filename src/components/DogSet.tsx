import styled from "styled-components";
import type { DogCard } from "../interfaces/Dog";

const Grid = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  background-color: bisque;
  padding: 12px;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 30%;
  padding: 2%;
  margin: 1%;
  border: 3px darkred solid;
  font: italic small-caps bold calc(2px + 1vw) Papyrus, fantasy;
  text-align: center;
  background-color: darkorange;
`;

const DogImg = styled.img`
  width: 100%;
  height: auto;
  border: 2px solid black;
`;

export default function DogGallery(props: { data: DogCard[] }) {
  return (
    <Grid>
      {props.data.map((dog: DogCard) => (
        <Card key={dog.id}>
          <h1>{dog.breed}</h1>
          <p>{dog.subBreed ? `(sub-breed: ${dog.subBreed})` : "(no sub-breed)"}</p>
          <p>ID: {dog.id}</p>
          <DogImg src={dog.url} alt={`dog ${dog.breed}`} />
        </Card>
      ))}
    </Grid>
  );
}