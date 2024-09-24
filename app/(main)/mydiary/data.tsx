import {
  Bed,
  BedSingle,
  BicepsFlexed,
  Book,
  Building2,
  Car,
  CloudLightning,
  CloudRain,
  Cloudy,
  Droplets,
  Dumbbell,
  Frown,
  Headset,
  Heart,
  Hospital,
  Joystick,
  Laugh,
  MicVocal,
  Milk,
  Plane,
  Scissors,
  Smile,
  Snowflake,
  Sun,
  ThermometerSun,
  Tv,
  Users,
  Utensils,
  Wind,
} from "lucide-react"

import { GiBackPain } from "react-icons/gi"
import { MdFamilyRestroom } from "react-icons/md"
import { FaRunning } from "react-icons/fa"
import { PiHandsPrayingDuotone } from "react-icons/pi"
import { FaUmbrellaBeach } from "react-icons/fa"
import { MdVolcano } from "react-icons/md"
import { MdSick } from "react-icons/md"
import { IoMdWoman } from "react-icons/io"
import { GiStomach } from "react-icons/gi"
import { MdPregnantWoman } from "react-icons/md"
import { BiSolidTired } from "react-icons/bi"

export type TagDetail = {
  key: string
  icon: React.ReactElement
  text: string
}
export type TagData = {
  날씨: Record<string, TagDetail>
  관계: Record<string, TagDetail>
  활동: Record<string, TagDetail>
  감정: Record<string, TagDetail>
  컨디션: Record<string, TagDetail>
}
export const datas: TagData = {
  날씨: {
    sun: { key: "sun", icon: <Sun />, text: "맑음" },
    cloud: { key: "cloud", icon: <Cloudy />, text: "흐림" },
    rain: { key: "rain", icon: <CloudRain />, text: "비" },
    snow: { key: "snow", icon: <Snowflake />, text: "눈" },
    hot: { key: "hot", icon: <ThermometerSun />, text: "무더위" },
    wind: { key: "wind", icon: <Wind />, text: "바람" },
    sweat: { key: "sweat", icon: <Droplets />, text: "습함" },
    storm: { key: "storm", icon: <CloudLightning />, text: "폭풍" },
  },
  관계: {
    friend: { key: "friend", icon: <Users />, text: "친구" },
    colleague: { key: "colleague", icon: <Building2 />, text: "회사동료" },
    couple: { key: "couple", icon: <Heart />, text: "연인" },
    family: { key: "family", icon: <MdFamilyRestroom />, text: "가족" },
  },
  활동: {
    tv: { key: "tv", icon: <Tv />, text: "TV 시청" },
    reading: { key: "reading", icon: <Book />, text: "독서" },
    game: { key: "game", icon: <Joystick />, text: "게임" },
    travel: { key: "travel", icon: <Plane />, text: "여행" },
    drive: { key: "drive", icon: <Car />, text: "드라이브" },
    eatout: { key: "eatout", icon: <Utensils />, text: "외식" },
    // youtube: { key: "youtube", icon: <Youtube />, text: "유튜브" },
    rest: { key: "rest", icon: <Bed />, text: "휴식" },
    workout: { key: "workout", icon: <Dumbbell />, text: "운동" },
    drink: { key: "drink", icon: <Milk />, text: "물 마시기" },
    music: { key: "music", icon: <Headset />, text: "음악 감상" },
    hospital: { key: "hospital", icon: <Hospital />, text: "병원" },
    sing: { key: "sing", icon: <MicVocal />, text: "노래" },
    hair: { key: "hair", icon: <Scissors />, text: "미용실" },
    running: { key: "running", icon: <FaRunning />, text: "러닝" },
  },
  감정: {
    anxious: { key: "anxious", icon: <Frown />, text: "불안함" },
    tired: { key: "tired", icon: <BedSingle />, text: "지침" },
    thankful: {
      key: "thankful",
      icon: <PiHandsPrayingDuotone />,
      text: "감사함",
    },
    comfort: { key: "comfort", icon: <FaUmbrellaBeach />, text: "편안함" },
    angry: { key: "angry", icon: <MdVolcano />, text: "화남" },
  },
  컨디션: {
    fine: { key: "fine", icon: <Smile />, text: "양호함" },
    fresh: { key: "fresh", icon: <Laugh />, text: "상쾌함" },
    musclepain: {
      key: "musclepain",
      icon: <BicepsFlexed />,
      text: "근육통",
    },
    exhaustion: {
      key: "exhaustion",
      icon: <BiSolidTired />,
      text: "피로함",
    },
    backache: {
      key: "backache",
      icon: <GiBackPain />,
      text: "허리 아픔",
    },
    cramps: { key: "cramps", icon: <IoMdWoman />, text: "생리통" },
    indigestion: {
      key: "indigestion",
      icon: <GiStomach />,
      text: "소화 불량",
    },
    pregnant: {
      key: "pregnant",
      icon: <MdPregnantWoman />,
      text: "임신",
    },
    flu: { key: "flu", icon: <MdSick />, text: "감기" },
  },
}
export const tabData = ["날씨", "관계", "활동", "감정", "컨디션"]
