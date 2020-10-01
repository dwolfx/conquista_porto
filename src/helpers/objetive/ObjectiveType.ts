import NotFoundObjectiveTypeException from './exceptions/NotFoundObjectiveTypeException'

/**
 * Objective type list and helpers
 *
 * @export
 * @class ObjectiveType
 *
 * @example
 * import { ObjectiveType, errors } from 'helpers/objetive'
 *
 * try {
 *   const n1 = ObjectiveType.parseNameToId('trip') //1
 *   const n2 = ObjectiveType.parseIdToName(1) //trip
 * } catch (error) {
 *
 *   switch (error.constructor) {
 *     case errors.NotFoundObjectiveTypeException:
 *       console.log('Treatment A')
 *       break
 *     default:
 *       console.log('Treatment B')
 *   }
 * }
 */

export default class ObjectiveType {
  static readonly list = [
    {
      id: 1,
      name: 'TRAVEL',
    },
    {
      id: 2,
      name: 'RETIRE',
    },
    {
      id: 3,
      name: 'CAR',
    },
    {
      id: 4,
      name: 'COURSE',
    },
    {
      id: 5,
      name: 'EVENT',
    },
    {
      id: 6,
      name: 'HOUSE',
    },
    {
      id: 7,
      name: 'MONEY',
    },
  ]

  /**
   * Converts objetive type id to objective type name
   * Can be used to find out if any goals type exist
   *
   * @static
   * @memberof ObjectiveType
   * @param {number} id - Objective type id
   * @returns {string} - Objetive type name
   *
   * @example
   * ObjectiveType.parseNameToId('event') //5
   * ObjectiveType.parseNameToId('WRONG_NAME') //throw error
   */
  static parseIdToName(id: number): string {
    const result = this.list.filter(goal => goal.id === id)
    if (!result) throw new NotFoundObjectiveTypeException('id', id.toString())
    return result[0].name
  }

  /**
   * Converts objetive type name to objective type if
   * Can be used to find out if any goals type exist
   *
   * @static
   * @memberof ObjectiveType
   * @param {string} name - Objetive type name
   * @returns {number} - Objective type id
   *
   * @example
   * ObjectiveType.parseIdToName(5) //event
   * ObjectiveType.parseIdToName(9999) //throw error
   */
  static parseNameToId(name: string): number {
    const result = this.list.filter(goal => goal.name === name)
    if (!result) throw new NotFoundObjectiveTypeException('name', name)
    return result[0].id
  }

  /**
   * Dynamically get the objective type image
   *
   * @static
   * @memberof ObjectiveType
   * @param {number} id - Objetive type id
   * @returns {Promise<string>} - Objective type image url
   *
   * @example
   * const image1 = await ObjectiveType.getImageById(1) //trip.jpg
   * const image2 = await ObjectiveType.getImageById(9999) //throw error
   */
  static async getImageById(id: number) {
    const filename = this.parseIdToName(id)
    const image: { default: string } = await import(
      `assets/images/pages/Objectives/Manager/banner_default/${filename}.jpg`
    )
    return image.default
  }
}
