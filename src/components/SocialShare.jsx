import { Dropdown } from "flowbite-react";
import { FaFacebook, FaWhatsapp, FaLinkedin } from "react-icons/fa";

export function SocialShare() {
  return (
    <Dropdown label="Share">
      <Dropdown.Header>
        <span className="block text-sm">TechTalk</span>
        <span className="block truncate text-sm font-medium">
          help@techtalk12.com
        </span>
      </Dropdown.Header>
      <Dropdown.Item
        icon={FaFacebook}
        href={`https://www.facebook.com/sharer/sharer.php?u=https://techtalk-frontend-eotw69lik-edwin6666.vercel.app`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Facebook
      </Dropdown.Item>
      <Dropdown.Item
        icon={FaWhatsapp}
        href={`https://api.whatsapp.com/send?text=https://techtalk-frontend-eotw69lik-edwin6666.vercel.app`}
        target="_blank"
        rel="noopener noreferrer"
      >
        WhatsApp
      </Dropdown.Item>
      <Dropdown.Item
        icon={FaLinkedin}
        href={`http://www.linkedin.com/shareArticle?url=https://techtalk-frontend-eotw69lik-edwin6666.vercel.app`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Linkedin
      </Dropdown.Item>
    </Dropdown>
  );
}
