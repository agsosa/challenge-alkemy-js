import Articles from "components/dashboard/Articles";
import Card from "components/dashboard/Card";
import tw, { styled } from "twin.macro";
import { ContentWithPaddingXl as ContentBase } from "treact/components/misc/Layouts";
import { SectionHeading } from "treact/components/misc/Headings";

import Chart from "components/dashboard/AreaChart";
import PieChart from "components/dashboard/PieChart";
import DemoGauge from "components/dashboard/Gauge";

const HeaderContainer = tw.div`w-full flex flex-col items-center`;
const Heading = tw(SectionHeading)`w-full text-primary-500 text-5xl`;
const Money = tw.text`w-full text-gray-700 text-center text-3xl font-bold`;
const MoneySmall = styled.text(({ isNegative }) => [
  tw`w-full text-center text-xl font-bold`,
  isNegative ? tw`text-red-600` : tw`text-green-600`,
]);
const Description = tw.text`w-full text-gray-600 text-center text-sm`;
const Container = tw.div`w-full flex flex-col items-center `;
const FlujoContainer = tw(Container)`lg:flex-row md:mb-10 -mb-5`;

const ContentWithPaddingXl = tw(
  ContentBase
)`relative mx-auto px-0 py-10 sm:px-6 md:px-8 lg:px-12 xl:px-24 sm:py-10 flex flex-col max-w-full`;

const CardsContainer = tw.div`mt-10 lg:grid gap-4 grid-cols-2 items-center lg:items-stretch lg:justify-between text-gray-900 font-medium`;

const TestComponent = () => <button type="submit">Ver más</button>;

function DashboardPage() {
  return (
    <ContentWithPaddingXl>
      <HeaderContainer>
        <Heading>Hello, Alejandro</Heading>
        <Money>$580.000.000</Money>
        <Description>Tu saldo hoy</Description>
      </HeaderContainer>
      <CardsContainer>
        <Card title="Tendencia del saldo">
          <Chart />
        </Card>
        <Card title="Últimas operaciones" RightHeaderComponent={TestComponent}>
          hola hola testeando contenido xddddd
          <button type="submit">test button</button>
        </Card>
        <Card title="Gastos por categoría" RightHeaderComponent={TestComponent}>
          <Container>
            <Description>Últimos 31 dias</Description>
            <MoneySmall isNegative>-$366.55,10</MoneySmall>
            <PieChart />
          </Container>
        </Card>
        <Card title="Flujo del dinero" RightHeaderComponent={TestComponent}>
          <Container>
            <FlujoContainer>
              <Container>
                <Description>Últimos 31 dias</Description>
                <MoneySmall>+$366.55,10</MoneySmall>
              </Container>
              <Container>
                <Description>Ingresos</Description>
                <MoneySmall>+$366.55,10</MoneySmall>
              </Container>
              <Container>
                <Description>Egresos</Description>
                <MoneySmall isNegative>-$366.55,10</MoneySmall>
              </Container>
            </FlujoContainer>
            <DemoGauge />
          </Container>
        </Card>
      </CardsContainer>

      <Articles />
    </ContentWithPaddingXl>
  );
}

export default DashboardPage;
