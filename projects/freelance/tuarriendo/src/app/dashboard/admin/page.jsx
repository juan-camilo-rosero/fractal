"use client";
import { UserContext } from "@/context/UserContext";
import { getUserEmail } from "@/lib/auth_functions";
import { getDisapprovedUsers, isAdmin, approveUser } from "@/lib/db_functions";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PiCheckSquareDuotone } from "react-icons/pi";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from "@/components/ui/alert-dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function Page() {
  const router = useRouter();
  const [isValid, setIsValid] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [alertInfo, setAlertInfo] = useState({ show: false, success: false, message: "" });
  const { email } = useContext(UserContext);

  useEffect(() => {
    const fetchUserIsAdmin = async () => {
      try {
        const email = await getUserEmail();
        const userIsAdmin = await isAdmin(email);
        
        if (!userIsAdmin) {
          router.push("/dashboard");
          return;
        }
        
        setIsValid(true);
        const usersData = await getDisapprovedUsers();
        setUsers(usersData);
      } catch (error) {
        console.error("Error al validar usuario o cargar datos:", error);
        setAlertInfo({
          show: true,
          success: false,
          message: "Error al cargar la información. Por favor, intenta de nuevo."
        });
      }
    };

    if (email) fetchUserIsAdmin();
  }, [email, router]);

  const openConfirmDialog = (user) => {
    setSelectedUser(user);
    setConfirmDialogOpen(true);
  };

  const handleApproveUser = async () => {
    if (!selectedUser) return;
    
    try {
      setLoading(true);
      await approveUser(selectedUser.id);
      
      const updatedUsers = users.filter(user => user.id !== selectedUser.id);
      setUsers(updatedUsers);
      
      setAlertInfo({
        show: true,
        success: true,
        message: `El usuario ${selectedUser.name} ha sido aprobado exitosamente.`
      });
    } catch (error) {
      console.error("Error al aprobar usuario:", error);
      setAlertInfo({
        show: true,
        success: false,
        message: "No se pudo aprobar al usuario. Por favor, intenta de nuevo."
      });
    } finally {
      setLoading(false);
      setConfirmDialogOpen(false);
    }
  };

  const closeAlert = () => {
    setAlertInfo({ show: false, success: false, message: "" });
  };

  if (!isValid) {
    return (
      <div className="flex items-center justify-center h-64">
        <h2 className="text-xl font-semibold">Validando perfil...</h2>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="dashboard-title mb-6">Usuarios pendientes por aprobación</h2>
      
      {alertInfo.show && (
        <Alert variant={alertInfo.success ? "default" : "destructive"} className="mb-6">
          <AlertTitle>{alertInfo.success ? "Éxito" : "Error"}</AlertTitle>
          <AlertDescription>{alertInfo.message}</AlertDescription>
          <Button variant="outline" size="sm" onClick={closeAlert} className="mt-2 w-auto">Cerrar</Button>
        </Alert>
      )}
      
      {users.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-lg text-gray-500">No hay usuarios pendientes de aprobación</p>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableCaption>Lista de usuarios pendientes de aprobación</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Número de ID</TableHead>
                <TableHead>Teléfono</TableHead>
                <TableHead className="text-right">Acción</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.idNumber}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      onClick={() => openConfirmDialog(user)}
                      disabled={loading}
                      className="rounded-md hover:bg-primary-600"
                    >
                      <PiCheckSquareDuotone className="mr-2 !h-5 !w-5" />
                      Aprobar usuario
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <AlertDialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar aprobación</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Estás seguro de que deseas aprobar al usuario <strong>{selectedUser?.name}</strong> con número de identificación <strong>{selectedUser?.idNumber}</strong>?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleApproveUser}>Confirmar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default Page;