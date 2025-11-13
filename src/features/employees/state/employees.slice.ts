import { StateCreator } from 'zustand';
import { Employee } from '../../../core/domain/entities/Employee';
import { AuthSliceType } from '../../auth/state/authLogin.slice';
import { OwnerSliceType } from '../../owner/state/owner.slice';

export type EmployeesSliceType = {
  employee: Employee;
};

export const createEmployeesSlice: StateCreator<
  EmployeesSliceType & AuthSliceType & OwnerSliceType,
  [],
  [],
  EmployeesSliceType
> = set => ({
  employee: {},
  //   characters: {
  //     results: [],
  //   },
  //   fetchCharacters: async () => {
  //     const characters = await getAllCharacters();
  //     set({
  //       characters,
  //     });
  //   },
});
