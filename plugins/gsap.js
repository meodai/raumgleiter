import {
  gsap,
} from 'gsap';
import {
  ScrollToPlugin,
} from 'gsap/ScrollToPlugin';
import {
  ScrollTrigger,
} from 'gsap/ScrollTrigger';

//import { CustomEase } from "gsap/CustomEase";
gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

export default gsap;
