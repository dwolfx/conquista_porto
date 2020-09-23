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
 *   const n1 = ObjeiveType.parseNameToId('trip') //1
 *   const n2 = ObjeiveType.parseIdToName(1) //trip
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
      name: 'trip',
    },
    {
      id: 2,
      name: 'retirement',
    },
    {
      id: 3,
      name: 'car',
    },
    {
      id: 4,
      name: 'course',
    },
    {
      id: 5,
      name: 'event',
    },
    {
      id: 6,
      name: 'home',
    },
    {
      id: 7,
      name: 'save_money',
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
   * ObjeiveType.parseNameToId('event') //5
   * ObjeiveType.parseNameToId('WRONG_NAME') //throw error
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
   * ObjeiveType.parseIdToName(5) //event
   * ObjeiveType.parseIdToName(9999) //throw error
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
   * const image1 = await ObjeiveType.getImageById(1) //trip.jpg
   * const image2 = await ObjeiveType.getImageById(9999) //throw error
   */
  static async getImageById(id: number) {
    const filename = this.parseIdToName(id)
    const image: { default: string } = await import(
      `assets/images/pages/Objectives/Manager/banner_default/${filename}.jpg`
    )
    return image.default
  }
}
