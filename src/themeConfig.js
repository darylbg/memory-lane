import violet_evergarden from "./Assets/Images/violet_evergarden.jpg";
import beabadoobee from "./Assets/Images/Beabadoobee.jpg";
import black_metal from "./Assets/Images/black_metal.jpg";
import emo from "./Assets/Images/emo.jpg";
import euro_trash from "./Assets/Images/euro_trash.jpg";
import hardstyle from "./Assets/Images/hardstyle.jpg";
import sabrina_chappell from "./Assets/Images/sabrina_chappell.jpg";
import slutty from "./Assets/Images/slutty.jpg";
import anime_intros from "./Assets/Images/anime_intros.jpg";

const themes = {
  violet_evergarden: {
    name: "violet_evergarden",
    background_image: violet_evergarden,
    playlist_id: "PLGfuzA9DIZHESr5KpZ5brncUGPbug2zA2",
  },
  sabrina_chappell: {
    name: "sabrina_chappell",
    background_image:
      sabrina_chappell,
    playlist_id: "PLrdXCLKO5y0V5SmTUQPAklWItIE0ZqsZ0",
  },
  emo: {
    name: "emo",
    background_image:
     emo,
    playlist_id: "PLGXbBW1RbSb6S1LFTOXwzvTwDGWko1X0B",
  },
  beabadoobee: {
    name: "beabadoobee",
    background_image:
      beabadoobee,
    playlist_id: "PLslYxMDAJ0l6JMZiAMD-GTV9i17fGxgWJ",
  },
  anime_intros: {
    name: "anime_intros",
    background_image:
      anime_intros,
    playlist_id: "RDQMstM8b3uTGFs",
  },
  black_metal: {
    name: "alt_theme",
    background_image:
      black_metal,
    playlist_id: "PLLfNLvr7tG342mAo8LTjjpfZyDOdZV37S",
  },
  slutty: {
    name: "alt_theme",
    background_image:
      slutty,
    playlist_id: "PLHWY2Ip-nsEA-oW44hrzN9Eaoxj8KziWp",
  },
  euro_trash: {
    name: "alt_theme",
    background_image:
      "https://i.guim.co.uk/img/media/cccd94137def1cb1a8242fa8526012b11c92049f/0_18_1747_1048/master/1747.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=f5e36bb173527368be437290cf82a457",
    playlist_id: "PLoonmGhV9oWHfhtZ6yuShRcu0VoxMYD1n",
  },
  hardstyle: {
    name: "alt_theme",
    background_image:
      euro_trash,
    playlist_id: "PLiiWa3UiP4H1PlmPY1FlReILnYZ4oM4cL",
  },
};
// PLrdXCLKO5y0V5SmTUQPAklWItIE0ZqsZ0
export const getTheme = (themeName) =>
  themes[themeName] || themes.violet_evergarden;

export default themes;
