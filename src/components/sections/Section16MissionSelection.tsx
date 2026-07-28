import React from 'react';
import { BachelorsMissionArena } from './BachelorsMissionArena';

interface SectionProps {
  onUserDataChanged: () => void;
}

export const Section16MissionSelection: React.FC<SectionProps> = ({ onUserDataChanged }) => {
  return <BachelorsMissionArena onUserDataChanged={onUserDataChanged} />;
};
