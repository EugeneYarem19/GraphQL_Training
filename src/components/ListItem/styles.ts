import {StyleSheet,} from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderColor: '#000',
    borderWidth: 1,
    marginBottom: 6,
    marginHorizontal: 8,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  leftBlock: { flex: 1, },
  rightBlock: {flexDirection: 'column', justifyContent: "center",},
  booked: {
    height: 35,
    width: 35,
    backgroundColor: "green",
    borderRadius: 25,
  },
  noBooked: {},
  title: {
    color: '#1E90FF',
    fontSize: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  text: {fontSize: 16,},
  link: {
    color: 'blue',
    fontSize: 16,
  },
});
