import {
  addStudent,
  addContactInfo,
  addNotificationInfo,
  addSiblingInfo,
  addLearningInfo,
  addAchievements,
} from '../../firebase/students/students';
import {
  StudentCollection,
  ContactInfo,
  NotificationInfo,
  SiblingInfo,
  LearningInfo,
  Achievements,
} from '../../types';

export const studentsService = {
  addStudent: async (student: StudentCollection) => {
    try {
      const studentRef = await addStudent(student);
      return studentRef;
    } catch (error) {
      console.error('Error adding student:', error);
      throw error;
    }
  },
  addContactInfo: async (contactInfo: ContactInfo) => {
    try {
      await addContactInfo(contactInfo);
      console.log('Contact info added successfully');
    } catch (error) {
      console.error('Error adding contact info:', error);
      throw error;
    }
  },
  addNotificationInfo: async (notificationInfo: NotificationInfo) => {
    try {
      await addNotificationInfo(notificationInfo);
      console.log('Notification info added successfully');
    } catch (error) {
      console.error('Error adding notification info:', error);
      throw error;
    }
  },
  addSiblingInfo: async (siblingInfo: SiblingInfo) => {
    try {
      await addSiblingInfo(siblingInfo);
      console.log('Sibling info added successfully');
    } catch (error) {
      console.error('Error adding sibling info:', error);
      throw error;
    }
  },
  addLearningInfo: async (learningInfo: LearningInfo) => {
    try {
      await addLearningInfo(learningInfo);
      console.log('Learning info added successfully');
    } catch (error) {
      console.error('Error adding learning info:', error);
      throw error;
    }
  },
  addAchievements: async (achievements: Achievements) => {
    try {
      await addAchievements(achievements);
      console.log('Achievements added successfully');
    } catch (error) {
      console.error('Error adding achievements:', error);
      throw error;
    }
  },
};
