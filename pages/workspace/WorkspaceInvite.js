import { Alert, FlatList, StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { Avatar, Button, Checkbox, Searchbar } from "react-native-paper";
import { buttonColor } from "../../styles/colorScheme"
import { useState } from "react";
import getUserByEmailApi from "../../api/userApi/getUserByEmail.api";
import addMembersWpApi from "../../api/workspaceApi/addMembersWp.api";

export default function WorkspaceInvite({ route }) {
	const { workspaceId } = route.params;
	const [users, setUsers] = useState([]);
	const [search, setSearch] = useState("");
	const [isLoadingUsers, setIsLoadingUsers] = useState(false);
	async function findUsers() {
		try {
			setIsLoadingUsers(true);
			const response = await getUserByEmailApi(search, 10);
			setUsers(response.map(user => (
				{
					id: user.id,
					email: user.email,
					username: user.firstName + user.lastName,
					avatar: user.picture,
					selected: user.selected ? user.selected : false,
				}
			)))
			setIsLoadingUsers(false);

		} catch {
			setIsLoadingUsers(false);
		}
	}
	async function addUsers() {
		try {
			const selectedUserIds = users.filter(user => user.selected == true).map(user => user.id)
			const response = await addMembersWpApi(workspaceId, selectedUserIds);
			if (response.status == 500) {
				Alert.alert(response.title)
				return;
			}
			Alert.alert("Success add members")

		} catch {

		}
	}
	return (
		<View style={styles.container}>
			<Searchbar style={styles.searchBar} placeholder="Enter Name or Email " onChangeText={setSearch} />
			<Button {...buttonColor} style={styles.buttonFind} onPress={findUsers}>find</Button>
			<View style={{ flex: 6, width: '100%' }}>
				{isLoadingUsers ? <ActivityIndicator size="large" color="black"/> : <FlatList
					data={users}
					renderItem={({ item, index }) => (
						<User
							id={item.id}
							username={item.username}
							email={item.email}
							avatar={item.avatar}
							setUsers={setUsers}
							users={users}
							index={index}
						/>
					)}
					keyExtractor={(item) => item.id}
				/>}
			</View>
			<Button {...buttonColor} style={styles.buttonAdd} onPress={addUsers}>add</Button>
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
	buttonAdd: {
		width: "30%",
		borderRadius: 10,
		marginBottom: 10,
		marginTop: 10
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
