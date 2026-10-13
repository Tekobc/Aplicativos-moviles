import { useCallback, useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Keyboard,
    Pressable,
    Text,
    TextInput,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../firebase/firebase';
import { deleteTask, getTasks, saveTask, updateTaskStatus } from '../services/taskService';
import { styles } from '../styles/TasksStyles';
import { theme } from '../styles/theme';

export default function TasksScreen({ navigation }) {
    const user = auth.currentUser;
    const [title, setTitle] = useState('');
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('todas'); // 'todas' | 'pendientes' | 'completadas'
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const loadTasks = useCallback(async () => {
        if (!user) {
            setLoading(false);
            return;
        }

        try {
            const data = await getTasks(user.uid);
            setTasks(data);
        } catch {
            Alert.alert('Error', 'No se pudieron cargar las tareas desde la base de datos.');
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        loadTasks();
    }, [loadTasks]);

    const handleAddTask = async () => {
        const cleanTitle = title.trim();
        if (!cleanTitle || !user) {
            return;
        }

        setSaving(true);
        try {
            await saveTask({
                titulo: cleanTitle,
                completada: false,
                userId: user.uid,
                createdAt: new Date().toISOString(),
            });
            setTitle('');
            Keyboard.dismiss();
            await loadTasks();
        } catch {
            Alert.alert('Error', 'No se pudo guardar la tarea. Intenta de nuevo.');
        } finally {
            setSaving(false);
        }
    };

    const handleToggleTask = async (task) => {
        const newStatus = !task.completada;
        // Actualización optimista local
        setTasks((prev) =>
            prev.map((t) => (t.id === task.id ? { ...t, completada: newStatus } : t))
        );

        try {
            await updateTaskStatus(task.id, newStatus);
        } catch {
            // Revertir si falla
            setTasks((prev) =>
                prev.map((t) => (t.id === task.id ? { ...t, completada: task.completada } : t))
            );
            Alert.alert('Error', 'No se pudo actualizar el estado de la tarea.');
        }
    };

    const handleDeleteTask = (task) => {
        Alert.alert(
            'Eliminar tarea',
            `¿Deseas eliminar "${task.titulo}"?`,
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: async () => {
                        // Eliminación optimista local
                        setTasks((prev) => prev.filter((t) => t.id !== task.id));
                        try {
                            await deleteTask(task.id);
                        } catch {
                            Alert.alert('Error', 'No se pudo eliminar la tarea.');
                            loadTasks();
                        }
                    },
                },
            ]
        );
    };

    const filteredTasks = tasks.filter((task) => {
        if (filter === 'pendientes') return !task.completada;
        if (filter === 'completadas') return task.completada;
        return true;
    });

    const pendingCount = tasks.filter((t) => !t.completada).length;

    return (
        <SafeAreaView style={styles.container}>
            {/* Header con navegación y contador */}
            <View style={styles.header}>
                <Pressable
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                    hitSlop={8}
                >
                    <Ionicons name="arrow-back" size={20} color={theme.colors.text} />
                </Pressable>
                <View style={styles.headerTitleContainer}>
                    <Text style={styles.headerTitle}>Mis Tareas</Text>
                    <Text style={styles.headerSubtitle}>
                        {tasks.length === 1 ? '1 tarea total' : `${tasks.length} tareas totales`}
                    </Text>
                </View>
                <View style={styles.countBadge}>
                    <Text style={styles.countText}>{pendingCount} pend.</Text>
                </View>
            </View>

            <View style={styles.content}>
                {/* Formulario para agregar tarea */}
                <View style={styles.formCard}>
                    <Ionicons name="add-circle-outline" size={22} color={theme.colors.primary} />
                    <TextInput
                        style={styles.input}
                        placeholder="¿Qué tienes planeado hacer hoy?"
                        placeholderTextColor={theme.colors.textMuted}
                        value={title}
                        onChangeText={setTitle}
                        onSubmitEditing={handleAddTask}
                        returnKeyType="done"
                    />
                    <Pressable
                        style={({ pressed }) => [
                            styles.addButton,
                            pressed && styles.addButtonPressed,
                            (!title.trim() || saving) && styles.addButtonDisabled,
                        ]}
                        onPress={handleAddTask}
                        disabled={!title.trim() || saving}
                    >
                        {saving ? (
                            <ActivityIndicator size="small" color="#fff" />
                        ) : (
                            <>
                                <Ionicons name="add" size={18} color="#fff" />
                                <Text style={styles.addButtonText}>Crear</Text>
                            </>
                        )}
                    </Pressable>
                </View>

                {/* Filtros de tareas (chips) */}
                <View style={styles.filtersContainer}>
                    <Pressable
                        style={[
                            styles.filterChip,
                            filter === 'todas' && styles.filterChipActive,
                        ]}
                        onPress={() => setFilter('todas')}
                    >
                        <Text
                            style={[
                                styles.filterChipText,
                                filter === 'todas' && styles.filterChipTextActive,
                            ]}
                        >
                            Todas ({tasks.length})
                        </Text>
                    </Pressable>

                    <Pressable
                        style={[
                            styles.filterChip,
                            filter === 'pendientes' && styles.filterChipActive,
                        ]}
                        onPress={() => setFilter('pendientes')}
                    >
                        <Text
                            style={[
                                styles.filterChipText,
                                filter === 'pendientes' && styles.filterChipTextActive,
                            ]}
                        >
                            Pendientes ({pendingCount})
                        </Text>
                    </Pressable>

                    <Pressable
                        style={[
                            styles.filterChip,
                            filter === 'completadas' && styles.filterChipActive,
                        ]}
                        onPress={() => setFilter('completadas')}
                    >
                        <Text
                            style={[
                                styles.filterChipText,
                                filter === 'completadas' && styles.filterChipTextActive,
                            ]}
                        >
                            Completadas ({tasks.length - pendingCount})
                        </Text>
                    </Pressable>
                </View>

                {/* Lista o Indicador de carga */}
                {loading ? (
                    <ActivityIndicator size="large" color={theme.colors.primary} style={styles.loader} />
                ) : (
                    <FlatList
                        data={filteredTasks}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={filteredTasks.length ? styles.list : styles.emptyList}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <View
                                style={[
                                    styles.taskCard,
                                    item.completada && styles.taskCardCompleted,
                                ]}
                            >
                                <Pressable
                                    onPress={() => handleToggleTask(item)}
                                    style={styles.checkboxButton}
                                    hitSlop={8}
                                >
                                    <Ionicons
                                        name={item.completada ? 'checkmark-circle' : 'ellipse-outline'}
                                        size={24}
                                        color={item.completada ? theme.colors.success : theme.colors.textMuted}
                                    />
                                </Pressable>

                                <Pressable
                                    style={styles.taskTextContainer}
                                    onPress={() => handleToggleTask(item)}
                                >
                                    <Text
                                        style={[
                                            styles.taskTitle,
                                            item.completada && styles.taskTitleCompleted,
                                        ]}
                                    >
                                        {item.titulo}
                                    </Text>
                                    <View style={styles.badgeRow}>
                                        <View
                                            style={[
                                                styles.statusBadge,
                                                item.completada
                                                    ? styles.statusBadgeCompleted
                                                    : styles.statusBadgePending,
                                            ]}
                                        >
                                            <Text
                                                style={[
                                                    styles.statusText,
                                                    item.completada
                                                        ? styles.statusTextCompleted
                                                        : styles.statusTextPending,
                                                ]}
                                            >
                                                {item.completada ? 'Completada' : 'Pendiente'}
                                            </Text>
                                        </View>
                                    </View>
                                </Pressable>

                                <Pressable
                                    style={({ pressed }) => [
                                        styles.deleteButton,
                                        pressed && styles.deleteButtonPressed,
                                    ]}
                                    onPress={() => handleDeleteTask(item)}
                                    hitSlop={8}
                                >
                                    <Ionicons name="trash-outline" size={19} color={theme.colors.danger} />
                                </Pressable>
                            </View>
                        )}
                        ListEmptyComponent={
                            <View style={styles.emptyList}>
                                <View style={styles.emptyIconContainer}>
                                    <Ionicons
                                        name={filter === 'completadas' ? 'time-outline' : 'sparkles'}
                                        size={32}
                                        color={theme.colors.primary}
                                    />
                                </View>
                                <Text style={styles.emptyTitle}>
                                    {filter === 'completadas'
                                        ? 'Sin tareas completadas'
                                        : filter === 'pendientes'
                                        ? '¡Estás al día!'
                                        : 'No tienes tareas aún'}
                                </Text>
                                <Text style={styles.emptySubtitle}>
                                    {filter === 'completadas'
                                        ? 'Marca tareas como completadas tocando su círculo.'
                                        : filter === 'pendientes'
                                        ? 'No tienes ninguna tarea pendiente. ¡Buen trabajo!'
                                        : 'Escribe el nombre de tu tarea arriba y pulsa "Crear" para comenzar.'}
                                </Text>
                            </View>
                        }
                    />
                )}
            </View>
        </SafeAreaView>
    );
}