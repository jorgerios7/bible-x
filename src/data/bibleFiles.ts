import _1ch from '../../assets/bible/1ch.json';
import _1co from '../../assets/bible/1co.json';
import _1jo from '../../assets/bible/1jo.json';
import _1ki from '../../assets/bible/1ki.json';
import _1pe from '../../assets/bible/1pe.json';
import _1sa from '../../assets/bible/1sa.json';
import _1th from '../../assets/bible/1th.json';
import _1ti from '../../assets/bible/1ti.json';
import _2ch from '../../assets/bible/2ch.json';
import _2co from '../../assets/bible/2co.json';
import _2jo from '../../assets/bible/2jo.json';
import _2ki from '../../assets/bible/2ki.json';
import _2pe from '../../assets/bible/2pe.json';
import _2sa from '../../assets/bible/2sa.json';
import _2th from '../../assets/bible/2th.json';
import _2ti from '../../assets/bible/2ti.json';
import _3jo from '../../assets/bible/3jo.json';
import act from '../../assets/bible/act.json';
import amo from '../../assets/bible/amo.json';
import col from '../../assets/bible/col.json';
import dan from '../../assets/bible/dan.json';
import deu from '../../assets/bible/deu.json';
import ecc from '../../assets/bible/ecc.json';
import eph from '../../assets/bible/eph.json';
import est from '../../assets/bible/est.json';
import eze from '../../assets/bible/eze.json';
import ezr from '../../assets/bible/ezr.json';
import exo from '../../assets/bible/exo.json';
import gal from '../../assets/bible/gal.json';
import gen from '../../assets/bible/gen.json';
import hab from '../../assets/bible/hab.json';
import hag from '../../assets/bible/hag.json';
import heb from '../../assets/bible/heb.json';
import hos from '../../assets/bible/hos.json';
import isa from '../../assets/bible/isa.json';
import jam from '../../assets/bible/jam.json';
import jdg from '../../assets/bible/jdg.json';
import jer from '../../assets/bible/jer.json';
import job from '../../assets/bible/job.json';
import joe from '../../assets/bible/joe.json';
import joh from '../../assets/bible/joh.json';
import jon from '../../assets/bible/jon.json';
import jos from '../../assets/bible/jos.json';
import jud from '../../assets/bible/jud.json';
import lam from '../../assets/bible/lam.json';
import lev from '../../assets/bible/lev.json';
import luk from '../../assets/bible/luk.json';
import mal from '../../assets/bible/mal.json';
import mar from '../../assets/bible/mar.json';
import mat from '../../assets/bible/mat.json';
import mic from '../../assets/bible/mic.json';
import nah from '../../assets/bible/nah.json';
import neh from '../../assets/bible/neh.json';
import num from '../../assets/bible/num.json';
import oba from '../../assets/bible/oba.json';
import phi from '../../assets/bible/phi.json';
import phm from '../../assets/bible/phm.json';
import pro from '../../assets/bible/pro.json';
import psa from '../../assets/bible/psa.json';
import rev from '../../assets/bible/rev.json';
import rom from '../../assets/bible/rom.json';
import rut from '../../assets/bible/rut.json';
import sol from '../../assets/bible/sol.json';
import tit from '../../assets/bible/tit.json';
import zec from '../../assets/bible/zec.json';
import zep from '../../assets/bible/zep.json';

export const bibleFiles = {
  '1ch': _1ch,
  '1co': _1co,
  '1jo': _1jo,
  '1ki': _1ki,
  '1pe': _1pe,
  '1sa': _1sa,
  '1th': _1th,
  '1ti': _1ti,
  '2ch': _2ch,
  '2co': _2co,
  '2jo': _2jo,
  '2ki': _2ki,
  '2pe': _2pe,
  '2sa': _2sa,
  '2th': _2th,
  '2ti': _2ti,
  '3jo': _3jo,
  act,
  amo,
  col,
  dan,
  deu,
  ecc,
  eph,
  est,
  eze,
  ezr,
  exo,
  gal,
  gen,
  hab,
  hag,
  heb,
  hos,
  isa,
  jam,
  jdg,
  jer,
  job,
  joe,
  joh,
  jon,
  jos,
  jud,
  lam,
  lev,
  luk,
  mal,
  mar,
  mat,
  mic,
  nah,
  neh,
  num,
  oba,
  phi,
  phm,
  pro,
  psa,
  rev,
  rom,
  rut,
  sol,
  tit,
  zec,
  zep,
} as const;

export type BibleFileKey = keyof typeof bibleFiles;
