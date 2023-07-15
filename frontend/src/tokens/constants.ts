import { IToken } from "./types";

import slimak from "../images/tokens/slimak-500.png";
import krtek from "../images/tokens/krtek-500.png";
import mozek from "../images/tokens/mozek-500.png";
import laso from "../images/tokens/laso-500.png";
import slon from "../images/tokens/slon-500.png";
import netopyr from "../images/tokens/netopyr-500.png";
import kozel from "../images/tokens/kozel-500.png";
import kanon from "../images/tokens/kanon-500.png";
import ctyrlistek from "../images/tokens/ctyrlistek-500.png";
import moucha from "../images/tokens/moucha-500.png";

import fire from "../images/resources/fire.png";
import coin from "../images/resources/coin.png";
import logo from "../images/resources/logo_v3.png";
import straight from "../images/resources/straight.png";
import pointer from "../images/resources/pointer.png";

import low from "../images/resources/wheel_low.png";
import medium from "../images/resources/wheel_medium.png";
import hight from "../images/resources/wheel_hight.png";
import huge from "../images/resources/wheel_huge.png";
import secret from "../images/resources/wheel_secret.png";

import t1 from "../images/resources/t1.gif";
import t2 from "../images/resources/t2.gif";
import t3 from "../images/resources/t3.gif";

const PLUGIN = "TOKENS";

export const CHANGE_SELECTED_TOKEN = `${PLUGIN}_change_selected_token`;
export const LOAD_TOKENS = `${PLUGIN}_load_tokens`;

export type IKeyImage = {
  [key: string]: string;
};

export const TOKENS_IMAGE_LIST: IKeyImage = {
  slimak: slimak,
  krtek: krtek,
  mozek: mozek,
  laso: laso,
  slon: slon,
  netopyr: netopyr,
  kozel: kozel,
  kanon: kanon,
  ctyrlistek: ctyrlistek,
  moucha: moucha,
};

export const IMAGES_RESOURCES = {
  fire: fire,
  coin: coin,
  logo: logo,
  straight: straight,
  pointer: pointer,
  t1: t1,
  t2: t2,
  t3: t3

};

export const WHEEL_PRIZES = {
  low: low,
  medium: medium,
  hight: hight,
  huge: huge,
  secret: secret,
};
