import { FlatList, StyleSheet, Text, View } from "react-native";
import { Avatar, Button, Checkbox, RadioButton, Searchbar } from "react-native-paper";
import { buttonColor } from "../../styles/colorScheme"
import { useState } from "react";

const temp = []
for (let i = 0; i <= 20; i++) {
	temp.push({
		id: i,
		username: "user" + i,
		email: "gmail" + i,
		selected: false
	})
}
export default function WorkspaceInvite() {
	const [users, setUsers] = useState(temp);
	return (
		<View style={styles.container}>
			<Searchbar style={styles.searchBar} placeholder="Enter username or gmail " />
			<Button {...buttonColor} style={styles.buttonFind}>find</Button>
			<View style={{ flex: 6, width: '100%' }}>
				<FlatList
					data={temp}
					renderItem={({ item, index }) => (
						<User
							id={item.id}
							username={item.username}
							email={item.email}
							avatar={item.avatar}
							setUsers={setUsers}
							users = {users}
							index = {index}
						/>
					)}
					keyExtractor={(item) => item.id}
				/>
			</View>
			<Button {...buttonColor} style={{ width: "30%", borderRadius: 10, marginBottom: 10, marginTop: 10 }}>add</Button>
		</View>
	);
}

function User({ id, username, email, avatar, setUsers, users, index }) {
	const [checked, setChecked] = useState(users[index].selected);
	return (
		<View
			style={styles.containerUSer}
		>
			<View style={styles.secondContainer}>
				<Avatar.Image
					size={45}
					source={{
						uri: avatar,
					}}
				/>
				<View style={styles.leftContainer}>
					<Text style={styles.usernameText}>{username}</Text>
					<Text>{email}</Text>
				</View>
				<View style={styles.timeContainer}>
					<Checkbox
						status={checked ? 'checked' : 'unchecked'}
						onPress={() => {
							users[index].selected = !checked;
							setChecked(!checked);
							setUsers(users);
						}} />
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		padding: 20,
	},
	timeContainer: {
		flex: 1,
		alignItems: "flex-end",
	},
	searchBar: {
		alignSelf: "flex-start",
		backgroundColor: 'white',
		borderWidth: 1,
		borderRadius: 15,
	},
	buttonFind: {
		width: '30%',
		borderRadius: 10,
		marginTop: 15,
		alignSelf: 'flex-end',
	},
	containerUSer: {
		padding: 13,
	},
	secondContainer: {
		flexDirection: "row",
		width: "100%",
	},
	leftContainer: {
		marginLeft: 10,
	},
	usernameText: {
		fontWeight: "bold",
		fontSize: 18,
	},
})