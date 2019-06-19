/*
 * DeploymentsPage Messages
 *
 * This contains all the text for the DeploymentsPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.DeploymentsPage';

export default defineMessages({
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: 'DeploymentsPage',
  },
  pageDesc: {
    id: `${scope}.pageDesc`,
    defaultMessage: 'Description of DeploymentsPage',
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the DeploymentsPage container!',
  },
  deployments: {
    id: `${scope}.deployments`,
    defaultMessage: 'Deployments',
  },
  tableTitleName: {
    id: `${scope}.tableTitleName`,
    defaultMessage: 'Name',
  },
  tableTitleReplicas: {
    id: `${scope}.tableTitleReplicas`,
    defaultMessage: 'Replicas',
  },
  tableTitleCreationTimestamp: {
    id: `${scope}.tableTitleCreationTimestamp`,
    defaultMessage: 'CreationTimestamp',
  },
  tableTitleActions: {
    id: `${scope}.tableTitleActions`,
    defaultMessage: 'Actions',
  },
  createDeployment: {
    id: `${scope}.createDeployment`,
    defaultMessage: 'Create Deployment',
  },
  pods: {
    id: `${scope}.pods`,
    defaultMessage: 'Pods',
  },
  deploymentDetail: {
    id: `${scope}.deploymentDetail`,
    defaultMessage: 'Deployment Detail',
  },
  save: {
    id: `${scope}.save`,
    defaultMessage: 'Save',
  },
  formAddContainer: {
    id: `${scope}.formAddContainer`,
    defaultMessage: 'AddContainer',
  },
  formName: {
    id: `${scope}.formName`,
    defaultMessage: 'Name',
  },
  formReplicas: {
    id: `${scope}.formReplicas`,
    defaultMessage: 'Replicas',
  },
  formContainers: {
    id: `${scope}.formContainers`,
    defaultMessage: 'Containers',
  },
  formContainerName: {
    id: `${scope}.formContainerName`,
    defaultMessage: 'ContainerName',
  },
  formImage: {
    id: `${scope}.formImage`,
    defaultMessage: 'Image',
  },
  formCommand: {
    id: `${scope}.formCommand`,
    defaultMessage: 'Command',
  },
  formArgs: {
    id: `${scope}.formArgs`,
    defaultMessage: 'Args',
  },
  formENV: {
    id: `${scope}.formENV`,
    defaultMessage: 'ENV',
  },
  formENVName: {
    id: `${scope}.formENVName`,
    defaultMessage: 'Name',
  },
  formENVValue: {
    id: `${scope}.formENVValue`,
    defaultMessage: 'Value',
  },
  formConfigName: {
    id: `${scope}.formConfigName`,
    defaultMessage: 'ConfigName',
  },
  formNone: {
    id: `${scope}.formNone`,
    defaultMessage: 'None',
  },
  formVolumeTypeConfigMap: {
    id: `${scope}.formVolumeTypeConfigMap`,
    defaultMessage: 'Config Map',
  },
  formVolumeTypeSecret: {
    id: `${scope}.formVolumeTypeSecret`,
    defaultMessage: 'Secret',
  },
  formVolumeTypePersistentVolume: {
    id: `${scope}.formVolumeTypePersistentVolume`,
    defaultMessage: 'Persistent Volume',
  },
  formVolumeType: {
    id: `${scope}.formVolumeType`,
    defaultMessage: 'VolumeType',
  },
  formVolumeName: {
    id: `${scope}.formVolumeName`,
    defaultMessage: 'VolumeName',
  },
  formMountPath: {
    id: `${scope}.formMountPath`,
    defaultMessage: 'MountPath',
  },
  formExposedPorts: {
    id: `${scope}.formExposedPorts`,
    defaultMessage: 'ExposedPorts',
  },
  formPortName: {
    id: `${scope}.formPortName`,
    defaultMessage: 'PortName',
  },
  formPortProtocol: {
    id: `${scope}.formPortProtocol`,
    defaultMessage: 'PortProtocol',
  },
  formPort: {
    id: `${scope}.formPort`,
    defaultMessage: 'Port',
  },
  formAdvancedOptions: {
    id: `${scope}.formAdvancedOptions`,
    defaultMessage: 'AdvancedOptions',
  },
  formReloadWhenConfigChange: {
    id: `${scope}.formReloadWhenConfigChange`,
    defaultMessage: 'ReloadWhenConfigChange',
  },
  formExposedServiceType: {
    id: `${scope}.formExposedServiceType`,
    defaultMessage: 'ExposedServiceType',
  },
  formAutoCreateService: {
    id: `${scope}.formAutoCreateService`,
    defaultMessage: 'AutoCreateService',
  },
  formServicePort: {
    id: `${scope}.formServicePort`,
    defaultMessage: 'ServicePort',
  },
  formAutoCreateIngress: {
    id: `${scope}.formAutoCreateIngress`,
    defaultMessage: 'AutoCreateIngress',
  },
  formIngressDomain: {
    id: `${scope}.formIngressDomain`,
    defaultMessage: 'IngressDomain',
  },
  formIngressPath: {
    id: `${scope}.formIngressPath`,
    defaultMessage: 'IngressPath',
  },
  formIngressPort: {
    id: `${scope}.formIngressPort`,
    defaultMessage: 'IngressPort',
  },
  formExposedMetricPath: {
    id: `${scope}.formExposedMetricPath`,
    defaultMessage: 'ExposedMetricPath',
  },
  formExposedMeticPort: {
    id: `${scope}.formExposedMeticPort`,
    defaultMessage: 'ExposedMeticPort',
  },
  formVolumes: {
    id: `${scope}.formVolumes`,
    defaultMessage: 'Volumes',
  },
  formServiceConfig: {
    id: `${scope}.formServiceConfig`,
    defaultMessage: 'ServiceConfig',
  },
  formAddVolumeClaimTemplate: {
    id: `${scope}.formAddVolumeClaimTemplate`,
    defaultMessage: 'Addd Volume Claim Template',
  },
  formVolumeClaimTemplate: {
    id: `${scope}.formVolumeClaimTemplate`,
    defaultMessage: 'Volume Claim Template',
  },
  formVolumeClaimTemplateName: {
    id: `${scope}.formVolumeClaimTemplateName`,
    defaultMessage: 'Name',
  },
  formVolumeClaimTemplateSize: {
    id: `${scope}.formVolumeClaimTemplateSize`,
    defaultMessage: 'Size',
  },
  formVolumeClaimTemplateStorageClassName: {
    id: `${scope}.formVolumeClaimTemplateStorageClassName`,
    defaultMessage: 'Storage Class Name',
  },
});
