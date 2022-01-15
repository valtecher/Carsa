interface Step{
  id: number,
  label: string,
}

export const orderSteps:Array<Step> = [
  { id: 0, label: 'Choose package', },
  { id: 1, label: 'Add Your Specification', },
  { id: 2, label: 'Sign E-Contract and accept policies', },
  { id: 4, label: 'Summary', }
]