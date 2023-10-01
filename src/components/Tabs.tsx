import { Tab } from "@headlessui/react";
import { Fragment } from "react";
import cx from "classnames";

interface TabProps {
  tabs: {
    title: string;
    panel: React.ReactNode;
    className?: string;
  }[];
}
export function Tabs(props: TabProps) {
  return (
    <Tab.Group>
      <Tab.List className="text-xxs">
        {props.tabs.map((tab) => (
          <Tab key={tab.title} as={Fragment}>
            {({ selected }) => (
              <button
                className={cx(
                  !selected && "text-gray-500",
                  "border-b px-2 py-1"
                )}
              >
                {tab.title}
              </button>
            )}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels>
        {props.tabs.map((tab) => (
          <Tab.Panel key={tab.title} className={tab.className}>
            {tab.panel}
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
}
