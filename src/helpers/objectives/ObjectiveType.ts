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
 *   const n1 = ObjectiveType.parseNameToId('TRAVEL') //1
 *   const n2 = ObjectiveType.parseIdToName(1) //TRAVEL
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
      lang: {
        ptbr: 'Viagem',
      },
    },
    {
      id: 2,
      name: 'RETIRE',
      lang: {
        ptbr: 'Aposentar',
      },
    },
    {
      id: 3,
      name: 'CAR',
      lang: {
        ptbr: 'Carro',
      },
    },
    {
      id: 4,
      name: 'COURSE',
      lang: {
        ptbr: 'Curso',
      },
    },
    {
      id: 5,
      name: 'EVENT',
      lang: {
        ptbr: 'Evento',
      },
    },
    {
      id: 6,
      name: 'HOUSE',
      lang: {
        ptbr: 'Casa',
      },
    },
    {
      id: 7,
      name: 'MONEY',
      lang: {
        ptbr: 'Poupar',
      },
    },
  ]

  /**
   * Converts objetive type id to objective type name
   * Can be used to find out if any goals type exist
   *
   * @static
   * @memberof ObjectiveType
   * @param {number} id - Objective type id
   * @param {boolean} translate - Whether to show the translation of the objective type
   * @returns {string} - Objetive type name
   *
   * @example
   * ObjectiveType.parseIdToName(5) //EVENT
   * ObjectiveType.parseIdToName(1, true) //Viagem
   * ObjectiveType.parseIdToName(9999) //throw error
   */
  static parseIdToName(id: number, translate: boolean = false): string {
    const result = this.list.find(goal => goal.id === id)
    if (!result) throw new NotFoundObjectiveTypeException('id', id.toString())
    return translate ? this.translate(result.name) : result.name
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
   * ObjectiveType.parseNameToId('EVENT') //5
   * ObjectiveType.parseNameToId('Casa') //6
   * ObjectiveType.parseNameToId('WRONG_NAME') //throw error
   */
  static parseNameToId(name: string): number {
    const result = this.list.find(
      goal => goal.name === name || goal.lang.ptbr === name
    )
    if (!result) throw new NotFoundObjectiveTypeException('name', name)
    return result.id
  }

  /**
   * Translate objective type name
   *
   * @static
   * @memberof ObjectiveType
   * @param {string} name - Objetive type name
   * @return {string} - Translated objective type name
   */
  static translate(objectiveTypeName: string): string {
    const result = this.list.find(goal => goal.name === objectiveTypeName)
    if (!result)
      throw new NotFoundObjectiveTypeException('name', objectiveTypeName)
    return result.lang.ptbr
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
   * const image1 = await ObjectiveType.getImageById(1) //travel.jpg
   * const image2 = await ObjectiveType.getImageById(9999) //throw error
   */
  static async getImageById(id: number) {
    const filename = this.parseIdToName(id)
    const image: { default: string } = await import(
      `assets/images/pages/Objectives/Manager/banner_default/${filename.toLowerCase()}.jpg`
    )
    return image.default
  }

  /**
   * Dynamically get the objective type image by goal type [enum: [ TRAVEL, RETIRE, CAR, COURSE, EVENT, HOUSE, MONEY ]]
   *
   * @static
   * @memberof ObjectiveType
   * @param {string} goalType - Objetive type id
   * @returns {Promise<string>} - Objective type image url
   *
   * @example
   * const image1 = await ObjectiveType.getImageByGoalType('TRAVEL') //travel.jpg
   * const image2 = await ObjectiveType.getImageById(9999) //throw error
   */
  static async getImageByGoalType(goalType: string) {
    console.log(goalType)
    const image: { default: string } = await import(
      `assets/images/pages/Objectives/Manager/banner_default/${goalType.toLowerCase()}.jpg`
    )
    return image.default
  }
}
