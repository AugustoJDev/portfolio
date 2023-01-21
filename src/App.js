import Typewriter from "typewriter-effect";
import Fade from "react-reveal/Fade";
import {
  ChakraProvider,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Heading,
  Image,
  SimpleGrid,
  Button,
} from "@chakra-ui/react"; 

import handleClickScroll from "./scripts/ScrollTo";

import { BsFillArrowDownCircleFill } from "react-icons/bs";
import { AiFillGithub, AiOutlineMail } from "react-icons/ai";
import { FaRobot, FaUserCircle } from "react-icons/fa";

import "./App.css";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

let halfScreen = getWindowDimensions().width / 6 + 30;

function App() {
  return (
    <div className="App">
      <div className="homePage">
        <Fade left>
          <div className="zap" style={{ backgroundColor: "transparent" }}>
            <AiFillGithub
              className="github"
              size={90}
              onClick={() => {
                window.open("https://github.com/AugustoJDev");
              }}
            />

            <h1 className="homeMessage">
              <Typewriter
                options={{
                  strings: [
                    "Hello World!",
                    "My name is Jonathan.",
                    "I'm a Junior Dev.",
                  ],
                  autoStart: true,
                  loop: true,
                }}
              />
            </h1>

            <h2>See About Me</h2>

            <BsFillArrowDownCircleFill
              className="arrowDown"
              size={30}
              onClick={() => {
                handleClickScroll("aboutme");
              }}
            />
          </div>
        </Fade>
      </div>
      <Fade left>
        <section
          id="aboutme"
          style={{ backgroundColor: "#e6e9e8" }}
          className="aboutsection"
        >
          <FaUserCircle className="userIcon" size={90} />
          <h1 className="aboutme-title">About Me</h1>
          <h1>
            Hello everyone! My Name is Jonathan and I'm a Junior Dev. I'm
            studying Javascript
            <br />
            with React, and at the moment I don't have much experience, but I
            have a lot of willpower!
            <br />
            At the moment I work as a freelancer and I make bots for the Discord
            platform, for private servers.
            <br />
            My work focus is on the front-end part, so the site was developed
            using React.
            <br />
            Do you need my services? Send me an e-mail by clicking{" "}
            <a href="mailto: augusto.jonathan02@gmail.com">
              here <AiOutlineMail />
            </a>
          </h1>

          <h1>See my Projects</h1>
          <BsFillArrowDownCircleFill
            className="arrowDown"
            size={30}
            onClick={() => {
              handleClickScroll("projects");
            }}
          />
        </section>
        <div className="zap2">
          <section id="projects" style={{ backgroundColor: "#e6e9e8" }}>
            <FaRobot className="robotIcon" size={90} />
            <h1 className="aboutme-title">Projects</h1>

            <ChakraProvider resetCSS={false}>
              <div
                className="cards"
                style={{
                  paddingLeft: halfScreen,
                }}
              >
                <SimpleGrid
                  spacing={4}
                  templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
                >
                  <Card
                    className="LS"
                    overflow="hidden"
                    variant="filled"
                    maxW="md"
                    backgroundColor="#efebb8"
                  >
                    <Image
                      src="https://media.discordapp.net/attachments/873959321376018462/1065739964853276702/jonathanaug-20230119-0001.jpg?width=715&height=473"
                      alt="League Support App"
                      borderRadius="lg"
                    ></Image>
                    <CardHeader>
                      <Heading size="md"> League Support</Heading>
                    </CardHeader>
                    <CardBody>
                      <Text>
                        League Support is a program designed to help players who
                        want to ease tasks in League of Legends.
                      </Text>
                    </CardBody>
                    <CardFooter>
                      <Button
                        onClick={() => {
                          window.open(
                            "https://github.com/AugustoJDev/LeagueSupport"
                          );
                        }}
                      >
                        Visit GitHub
                      </Button>
                    </CardFooter>
                  </Card>
                  <Card
                    className="LS"
                    overflow="hidden"
                    variant="filled"
                    maxW="md"
                    backgroundColor="#efebb8"
                  >
                    <Image
                      src="https://media.discordapp.net/attachments/873959321376018462/1066214640570355723/BrainlyAnswer.gif?width=882&height=580"
                      alt="Brainly Answer"
                      borderRadius="lg"
                    ></Image>
                    <CardHeader>
                      <Heading size="md"> Brainly Answer</Heading>
                    </CardHeader>
                    <CardBody>
                      <Text>
                        Application created in order to reveal the answers of
                        the Brainly application without the need to pay monthly
                        fees in the app.
                      </Text>
                    </CardBody>
                    <CardFooter>
                      <Button
                        onClick={() => {
                          window.open(
                            "https://www.instagram.com/p/CZ8BbsmL75LW1rVYFYnZTVJ5Ihk15Qk-6fmFTg0/"
                          );
                        }}
                      >
                        Visit Instagram
                      </Button>
                    </CardFooter>
                  </Card>
                  <Card
                    className="LS"
                    overflow="hidden"
                    variant="filled"
                    maxW="md"
                    backgroundColor="#efebb8"
                  >
                    <Image
                      src="https://camo.githubusercontent.com/bad4d4d8a220ad9830ae380e426aad59466a7664903f91dfb20c5e7507b10a65/68747470733a2f2f6d656469612e646973636f72646170702e6e65742f6174746163686d656e74732f3837333935393332313337363031383436322f313031323538383933383635303732323430352f756e6b6e6f776e2e706e673f77696474683d363637266865696768743d343332"
                      alt="Discord Oauth2"
                      borderRadius="lg"
                    ></Image>
                    <CardHeader>
                      <Heading size="md"> Discord Oauth2 Example</Heading>
                    </CardHeader>
                    <CardBody>
                      <Text>
                        A simple tutorial thats uses Express and EJS to create a
                        login system for Discord users.
                      </Text>
                    </CardBody>
                    <CardFooter>
                      <Button
                        onClick={() => {
                          window.open(
                            "https://github.com/AugustoJDev/discord-oauth2"
                          );
                        }}
                      >
                        Visit GitHub
                      </Button>
                    </CardFooter>
                  </Card>
                </SimpleGrid>
              </div>
            </ChakraProvider>
            <br />
            <br />
            <br />
            <br />
          </section>
          <footer>© 2023. Copyright by AugustoJDev </footer>;
        </div>
      </Fade>
    </div>
  );
}

export default App;
