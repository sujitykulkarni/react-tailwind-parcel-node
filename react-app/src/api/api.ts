import axios from "axios";
import { Team } from "../interfaces/teams.interfaces";
import { Event } from "../interfaces/events.interface";
import { Element } from "../interfaces/element.interface";
import { ElementSummary } from "../interfaces/elementSummary.interface";
import { API_HOST } from "../constants";
import { Fixture } from "../interfaces/fixtures.interface";

export const fetchElements = async () =>
  await new Promise<Element[]>((resolve, reject) => {
    axios
      .get<Element[]>(`${API_HOST}/elements`)
      .then(({ status, data }) => {
        if (status === 200) resolve(data);
        else reject();
      })
      .catch((e) => reject);
  });

export const fetchPlayerHistory = async (id: string) =>
  await new Promise<ElementSummary>((resolve, reject) => {
    axios
      .get<ElementSummary>(`${API_HOST}/elements/summary/${id}`)
      .then(({ status, data }) => {
        if (status === 200) resolve(data);
        else reject();
      })
      .catch((e) => reject);
  });

export const fetchTeams = async () =>
  await new Promise<Team[]>((resolve, reject) => {
    axios
      .get<Team[]>(`${API_HOST}/teams`)
      .then(({ status, data }) => {
        if (status === 200) resolve(data);
        else reject();
      })
      .catch((e) => reject);
  });

export const fetchGameWeeks = async () =>
  await new Promise<Event[]>((resolve, reject) => {
    axios
      .get<Event[]>(`${API_HOST}/fixtures/gameweeks`)
      .then(({ status, data }) => {
        if (status === 200) resolve(data);
        else reject();
      })
      .catch((e) => reject);
  });

export const fetchFixtures = async () =>
  await new Promise<Fixture[]>((resolve, reject) => {
    axios
      .get<Fixture[]>(`${API_HOST}/fixtures/`)
      .then(({ status, data }) => {
        if (status === 200) resolve(data);
        else reject();
      })
      .catch((e) => reject);
  });
