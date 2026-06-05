import agentLanes from '@/config/eden/factory/agent-lanes.json';
import connectorMap from '@/config/eden/factory/connector-map.json';
import cronMap from '@/config/eden/factory/cron-map.json';
import jobTypes from '@/config/eden/factory/job-types.json';
import templatePack from '@/config/eden/factory/template-pack.json';

export function getEdenFactoryMaps() {
  return {
    templatePack,
    agentLanes,
    cronMap,
    connectorMap,
    jobTypes
  };
}

export function getConnectorStatus(connector: string) {
  return connectorMap.find((item) => item.connector.toLowerCase() === connector.toLowerCase()) ?? null;
}

export function getJobType(jobType: string) {
  return jobTypes.find((item) => item.jobType === jobType) ?? null;
}
