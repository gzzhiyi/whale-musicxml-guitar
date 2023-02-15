import { isArray, isEmpty } from 'lodash'

export default function getTuningStep(measuresXML: any): string[] {
  let names = [];

  measuresXML.map((item: any) => {
    const { attributes } = item

    if (isEmpty(attributes)) {
      return;
    }

    const staffDetails = attributes['staff-details'];

    if (isEmpty(staffDetails)) {
      return;
    }

    let details: any = null;

    if (isArray(staffDetails)) {
      staffDetails.map((subItem) => {
        if (!subItem?.['staff-tuning']) {
          return;
        }

        details = subItem;
      });
    } else {
      details = staffDetails;
    }

    if (isEmpty(details['staff-tuning'])) {
      return
    }

    const arr: any = [];

    details['staff-tuning'].map((subItem) => {
      arr.push(subItem['tuning-step']);
    });

    names = arr;
  });

  return names;
}
