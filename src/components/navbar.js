import {
  Box,
  Flex,
  Text,
  IconButton,
  Tooltip,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";

//Icons
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { FaGithub, FaLinkedin } from "react-icons/fa";

//Logo
import Logo from "../logos/navlogo";

//Styles
import styles from "../styles/navbar.module.css";

export default function WithSubnavigation(props) {
  const { isOpen, onToggle } = useDisclosure();

  const scrollToRef = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  const NAV_ITEMS = [
    {
      label: "About",
      scroll: props.scrollToAbout,
    },
    {
      label: "Projects",
      scroll: props.scrollToProjects,
    },
    {
      label: "Contact",
      scroll: props.scrollToContact,
    },
  ];

  const DesktopNav = () => {
    const linkColor = useColorModeValue("gray.500", "gray.200");
    const linkHoverColor = useColorModeValue("gray.400", "white");

    return (
      <Stack direction={"row"} spacing={4}>
        {NAV_ITEMS.map((navItem) => (
          <Box key={navItem.label}>
            <Link
              p={2}
              onClick={() => scrollToRef(navItem.scroll)}
              fontSize={"sm"}
              fontWeight={500}
              color={linkColor}
              _hover={{
                textDecoration: "none",
                color: linkHoverColor,
              }}
            >
              {navItem.label}
            </Link>
          </Box>
        ))}
      </Stack>
    );
  };

  const MobileNav = () => {
    return (
      <Stack
        bg={useColorModeValue("white", "gray.800")}
        p={4}
        display={{ md: "none" }}
      >
        {NAV_ITEMS.map((navItem) => (
          <MobileNavItem key={navItem.label} {...navItem} />
        ))}
      </Stack>
    );
  };

  const MobileNavItem = (props) => {
    console.log(props);
    return (
      <Stack spacing={4}>
        <Flex
          py={2}
          as={Link}
          onClick={() => scrollToRef(props.scroll)}
          justify={"space-between"}
          align={"center"}
          _hover={{
            textDecoration: "none",
          }}
        >
          <Text
            fontWeight={600}
            color={useColorModeValue("gray.600", "gray.200")}
          >
            {props.label}
          </Text>
        </Flex>
      </Stack>
    );
  };

  return (
    <Box className={styles.nav}>
      <Flex
        opacity={"none"}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Box width={"200px"}>
            <Link href={"https://kasperluna.com"}>
              <Logo />
            </Link>
          </Box>
          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav scroll={scrollToRef} />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          <Tooltip label="Connect with me on LinkedIn!" aria-label="A tooltip">
            <IconButton
              as={"a"}
              colorScheme={"gray"}
              href={"https://www.linkedin.com/in/kasper-luna-1281a114b"}
              target={"_blank"}
              icon={<FaLinkedin className={styles.socialicons} />}
            />
          </Tooltip>
          <Tooltip label="Check out my Github!" aria-label="A tooltip">
            <IconButton
              as={"a"}
              colorScheme={"gray"}
              href={"https://github.com/KasperLunaIICS"}
              target={"_blank"}
              icon={<FaGithub className={styles.socialicons} />}
            />
          </Tooltip>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}
