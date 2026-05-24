export const formatReportCopy = (r) => {
  if (!r) return 'No rehearsal report found.';
  return `Rehearsal Report - ${r.showTitle}\nDate: ${r.rehearsalDate}\n\nDirector: ${r.directorNotes}\nTech: ${r.techNotes}\nSound: ${r.soundNotes}\nLighting: ${r.lightingNotes}\nProps: ${r.propsNotes}\nCostume: ${r.costumeNotes}\nTasks: ${r.followUpTasks}`;
};

export const statusClass = (status = '') => `status ${status.toLowerCase().replaceAll(' ', '-')}`;
