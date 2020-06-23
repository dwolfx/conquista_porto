import React from 'react'
import { IAnswer, ISuggestion } from 'store/modules/Objective/types'

export enum answerLabels {
  'nickname' = 'Apelido',
  'target_date' = 'Data Alvo',
  'target_value' = 'Meta Fincanceira',
  'initial_value' = 'Investimento Inicial',
  'monthly_value' = 'Investimento Mensal',
}

export interface IView {
  editValues: Omit<IAnswer, 'uf' | 'goal_type'>
  setEditValues: (state: Omit<IAnswer, 'uf' | 'goal_type'>) => void
  answer: IAnswer
  suggestionData: ISuggestion
  buttons: {
    [key in 'recalculate' | 'target_date' | 'monthly_value']: React.ReactNode
  }
  setError: (state: boolean) => void
}
